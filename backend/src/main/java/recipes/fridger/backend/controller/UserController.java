package recipes.fridger.backend.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import ch.qos.logback.classic.spi.ILoggingEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.mail.*;
import recipes.fridger.backend.dto.ReturnUserDTO;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import recipes.fridger.backend.crud.Goals;
import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;
import recipes.fridger.backend.service.GoalService;
import recipes.fridger.backend.crud.Pantries;

import java.util.Calendar;
import java.util.Locale;

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

    /*
     *  USER API
     */

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createUser(@RequestBody @Valid CreateUserDTO u) {
        try {
            userService.createUser(u);
            emailService.sendUserVerification(u.getEmail());
            log.info("Successful creation of user");
            return ResponseEntity.ok("Created user");
        } catch (Exception e) {
            log.warn("Unable to create user\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                "Unable to create user\n" + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
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

    // TODO use ReturnUserDTO instead of User
    @GetMapping(path = "/")
    public @ResponseBody Iterable<User>
    getUsers(@RequestParam(required = false) Long id, @RequestParam(required = false) String email) {
        return userService.getUsersByIdAndEmail(id, email);
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody ReturnUserDTO getUser(@PathVariable Long id) {
        ReturnUserDTO toRet = new ReturnUserDTO();
        toRet.convertFromUser(userService.getUser(id));
        return toRet;
    }

    // TODO update user, match token w/ username for security
    @PreAuthorize("hasRole('USER')")
    @PutMapping(path = "/{id}")
    public @ResponseBody ReturnUserDTO updateUser(@PathVariable Long id) {
        ReturnUserDTO toRet = new ReturnUserDTO();
        toRet.convertFromUser(userService.getUser(id));
        return toRet;
    }

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

    //@PreAuthorization("hasRole('USER') or hasRole(‘ADMIN’)")
    @PostMapping("/user/registration")
    public ModelAndView registerUserAccount(
            @ModelAttribute("user") @Valid CreateUserDTO userDto,
            HttpServletRequest request, Errors errors) {

        try {
            User registered = userService.registerNewUserAccount(userDto);

            String appUrl = request.getContextPath();
            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered,
                    request.getLocale(), appUrl));
        } catch (UserAlreadyExistException uaeEx) {
            ModelAndView mav = new ModelAndView("registration", "user", userDto);
            mav.addObject("message", "An account for that username/email already exists.");
            return mav;
        } catch (RuntimeException ex) {
            return new ModelAndView("emailError", "user", userDto);
        }

        return new ModelAndView("successRegister", "user", userDto);
    }



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
                @RequestParam(required = false) Double calories,
                @RequestParam(required = false) Double carbs,
                @RequestParam(required = false) Double protein,
                @RequestParam(required = false) Double fat,
                @RequestParam(required = false) Double currWeight,
                @RequestParam(required = false) Double goalWeight)
        {
            return goalService.getGoals(id, endGoal, calories, carbs, protein, fat, currWeight, goalWeight);
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

    @PostMapping(path = "/pantry") //TODO create path
    public ResponseEntity<String>
    createPantry(@RequestBody @Valid CreatePantryDTO p) {
        try {
            pantryService.createPantry(p);
            log.info("Successful creation of pantry");
            return ResponseEntity.ok("Created pantry");
        } catch (Exception e) {
            log.warn("Unable to create pantry\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create pantry" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/pantry/{pantryId}") //TODO create path
    public ResponseEntity<String>
    deletePantry(@PathVariable Long id) {
        try {
            pantryService.deletePantry(id);
            log.info("Successfully delete pantry #"+id);
            return ResponseEntity.ok("Deleted recipe");
        } catch (Exception e) {
            log.warn("Unable to delete recipe #" +id);
            return ResponseEntity.internalServerError().body("Unable to delete recipe");
        }
    }

    @GetMapping(path = "/pantry")
    public @ResponseBody Pantry
    getUserPantry(@RequestParam(required = false) Long id, @RequestParam(required = false) String email) {
        return pantryService.getPantryByID(id);
    }

    @GetMapping(path= "/pantry/{pantryId}")
    public @ResponseBody Pantry
    getPantryByID(@PathVariable Long pantryId)
    {
        return pantryService.getPantryByID(pantryId);
    }
}
