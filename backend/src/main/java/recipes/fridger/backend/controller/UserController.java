package recipes.fridger.backend.controller;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import ch.qos.logback.classic.spi.ILoggingEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.mail.*;
import recipes.fridger.backend.dto.ReturnUserDTO;
import recipes.fridger.backend.dto.UpdateUserDTO;
import recipes.fridger.backend.model.*;
import recipes.fridger.backend.service.CaloriesService;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import recipes.fridger.backend.crud.Goals;
import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.service.GoalService;
import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.crud.Roles;

@RestController
@Slf4j
@RequestMapping(path = "/v1/user")
public class UserController {

    @Autowired
    private Users users;

    @Autowired
    private Goals goals;

    @Autowired
    private Pantries pantry;

    @Autowired
    private EmailService emailService;

    @Autowired
    private GoalService goalService;

    @Autowired
    private UserService userService;

    @Autowired
    private PantryService pantryService;

    @Autowired
    private MessageSource messages;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Autowired
    private CaloriesService caloriesService;
    /*
     *  USER API
     */

    @GetMapping("/registrationConfirm")
    public String confirmRegistration
            (WebRequest request, Model model, @RequestParam("token") String token) {

        Locale locale = request.getLocale();

        VerificationToken verificationToken = userService.getVerificationToken(token);
        if (verificationToken == null) {
            String message = messages.getMessage("auth.message.invalidToken", null, locale);
            model.addAttribute("message", message);
            return "redirect:/badUser.html?lang=" + locale.getLanguage();
        }

        User user = verificationToken.getUser();
        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            String messageValue = messages.getMessage("auth.message.expired", null, locale);
            model.addAttribute("message", messageValue);
            return "redirect:/badUser.html?lang=" + locale.getLanguage();
        }

        user.setEnabled(true);
        userService.saveRegisteredUser(user);
        return "redirect:/login.html?lang=" + request.getLocale().getLanguage();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<? extends GrantedAuthority>  auths = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        User authed_user = users.findByEmail(principal.getUsername()).get();

        // This shouldn't happen from the front-end
        // Security sanity check
        if (authed_user.getId() != id &&
                (auths.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))))  {
            log.warn("User with id " + authed_user.getId() + " attempted to delete user " + id + "\'s account");
            return ResponseEntity.badRequest().body("Attempting to delete someone else's account");
        }

        try {
            userService.deleteUser(id);
            log.info("Successfully deleted User #" + id);
            return ResponseEntity.ok("Deleted user");
        } catch (Exception e) {
            log.warn("Unable to delete user\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                "Unable to delete user\n" + e.getMessage());
        }
    }

    @GetMapping(path = "/")
    public @ResponseBody Iterable<ReturnUserDTO>
    getUsers(@RequestParam(required = false) Long id, @RequestParam(required = false) String email) {
        Iterable<User> users = userService.getUsersByIdAndEmail(id, email);
        List<ReturnUserDTO> userDtos = new ArrayList<ReturnUserDTO>();
        for (User u: users) {
            ReturnUserDTO dto = new ReturnUserDTO();
            dto.convertFromUser(u);
            userDtos.add(dto);
        }
        return userDtos;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody ReturnUserDTO getUser(@PathVariable Long id) {
        ReturnUserDTO toRet = new ReturnUserDTO();
        toRet.convertFromUser(userService.getUser(id));
        return toRet;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping(path = "/")
    public ResponseEntity<String>
    updateUser(@RequestBody @Valid UpdateUserDTO u) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<? extends GrantedAuthority>  auths = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        User authed_user = users.findByEmail(principal.getUsername()).get();

        // This shouldn't happen from the front-end
        // Security sanity check
        if (authed_user.getId() != u.getId() &&
                (auths.stream().anyMatch(a -> a.getAuthority().equals("ADMIN")))) {
            log.warn("User with id " + authed_user.getId() + " attempted to modify user " + u.getId() + "\'s account");
            return ResponseEntity.badRequest().body("Attempting to modify someone else's account");
        }

        try {
            userService.updateUser(u.getId(),u);
            log.info("Log:" + String.valueOf(u));
            log.info("Successful update of user");
            return ResponseEntity.ok("Updated User");

        } catch (Exception e) {
            log.warn("Unable to update user\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to update user\n" + e.getMessage());
        }
    }



    //@PreAuthorization("hasRole('USER') or hasRole(‘ADMIN’)")




    /*
     *  GOAL API
     */

    @PostMapping(path = "/goal")
    public ResponseEntity<String>
    createGoal(@RequestBody @Valid CreateGoalDTO g) {
        try {
            goalService.createGoal(g);
            //log.info("Successful creation of goal");
            log.info(String.valueOf(g));
            return ResponseEntity.ok("Created goal");
        } catch (Exception e) {
            log.warn("Unable to create goal\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                    "Unable to create goal\n" + e.getMessage());
        }
    }

    @DeleteMapping(path = "/goal/{id}")
    public ResponseEntity<String> deleteGoal(@PathVariable Long id) {
        try {
            goalService.deleteGoal(id);
            log.info("Successfully deleted goal #" + id);
            return ResponseEntity.ok("Deleted goal");
        } catch (Exception e) {
            log.warn("Unable to delete goal\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                    "Unable to delete goal\n" + e.getMessage());
        }
    }

    @GetMapping(path = "/goals")
    public @ResponseBody Iterable<Goal>
    getGoals(@RequestParam(required = false) Long id,
                @RequestParam(required = false) String endGoal,
                @RequestParam(required = false) Integer calories,
                @RequestParam(required = false) Integer carbs,
                @RequestParam(required = false) Integer protein,
                @RequestParam(required = false) Integer fat,
                @RequestParam(required = false) Double currWeight,
                @RequestParam(required = false) Double goalWeight,
                @RequestParam(required = false) Long userId)
        {
            log.info("Returning all goals");
            return goalService.getGoals(id, endGoal, calories, carbs, protein, fat, currWeight, goalWeight, userId);

        }


    @GetMapping(path = "/goal/{goalId}")
    public @ResponseBody Goal
    getGoalByID(@PathVariable Long goalId)
    {
        return goalService.getGoalByID(goalId);
    }

    /*
     *  PANTRY API
     */

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping(path = "/pantry")
    public ResponseEntity<String>
    createPantry(@RequestBody @Valid CreatePantryDTO p) {
        try {
            pantryService.createPantry(p);
            log.info("Log:" + String.valueOf(p));
            log.info("Successful creation of pantry");
            return ResponseEntity.ok("Created pantry");
        } catch (Exception e) {
            log.warn("Unable to create pantry\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create pantry" + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping(path = "/pantry/{id}") //TODO create path
    public ResponseEntity<String>
    deletePantry(@PathVariable Long id) {
        try {
            pantryService.deletePantry(id);
            log.info("Successfully delete pantry #"+id);
            return ResponseEntity.ok("Deleted pantry");
        } catch (Exception e) {
            log.warn("Unable to delete pantry" +id);
            return ResponseEntity.internalServerError().body("Unable to delete recipe");
        }
    }
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping(path = "/pantry")
    public ResponseEntity<String> clearPantry() {
        try {
            pantryService.clearPantry();
            log.info("Successfully deleted all pantry items. You wield a dangerous power!");
            return ResponseEntity.ok("Deleted all pantry items");
        } catch (Exception e) {
            log.warn("Unable to clear pantry");
            return ResponseEntity.internalServerError().body("Unable to clear pantry");
        }
    }
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping(path = "/pantry/clear-pantry/{userID}")
    public ResponseEntity<String> clearUserPantry(@PathVariable Long userID) {
        try {
            pantryService.clearUserPantry(userID);
            log.info("Successfully deleted all pantry items. You wield a dangerous power!");
            return ResponseEntity.ok("Deleted all pantry items");
        } catch (Exception e) {
            log.warn("Unable to clear pantry");
            return ResponseEntity.internalServerError().body("Unable to clear pantry");
        }
    }
//    // TODO We should look at restructuring/refactoring this. Duplicate of the User GET mappings
//    @GetMapping(path = "/pantry")
//    public @ResponseBody Pantry
//    getUserPantry(@RequestParam(required = false) Long id, @RequestParam(required = false) String email) {
//        return pantryService.getPantryByUserID(id);
//    }
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/pantry/increase/{id}")
    public ResponseEntity<String>
    incrementPantryByOne(@PathVariable Long id) {
        try {
            pantryService.incrementPantryByOne(id);
            //log.info("Successfully Incremented pantry item by 1");
            return ResponseEntity.ok("Successfully Incremented pantry item by 1");
        } catch (Exception e) {
            log.warn("Unable to update pantry, does it exist?");
            return ResponseEntity.internalServerError().body("Unable to update pantry, does it exist?");
        }
    }
    //@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping(path = "/pantry/decrease/{id}")
    public ResponseEntity<String>
    decrementPantryByOne(@PathVariable Long id) {
        try {
            pantryService.decrementPantryByOne(id);
            //log.info("Successfully Incremented pantry item by 1");
            return ResponseEntity.ok("Successfully Incremented pantry item by 1");
        } catch (Exception e) {
            log.warn("Unable to decrement item. numIngredient can not go less than 0");
            return ResponseEntity.internalServerError().body("Unable to update pantry, does it exist?");
        }
    }

    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping(path = "/pantry")
    public @ResponseBody Iterable<Pantry>
    getAllPantrys() {
        log.info("Returning pantries");
        return pantryService.getAllPantrys();
    }

    //@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping(path= "/pantry/{userID}")
    public @ResponseBody Iterable<Pantry>
    getPantryByUserID(@PathVariable Long userID)
    {
        return pantryService.getPantryByUserID(userID);
    }


    @GetMapping(path = "/calories/{userId}")
    public @ResponseBody Iterable<Calorie>
    getCaloriesByUserId(@PathVariable Long userId) {
        return caloriesService.getCaloriesByUserId(userId);}
}