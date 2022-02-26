package recipes.fridger.backend.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;

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

import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.dto.ReturnUserDTO;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import recipes.fridger.backend.crud.Goals;
import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;
import recipes.fridger.backend.service.GoalService;
import recipes.fridger.backend.crud.Pantries;

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
    private GoalService goalService;

    @Autowired
    private UserService userService;

    @Autowired
    private PantryService pantryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
     *  USER API
     */

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createUser(@RequestBody @Valid CreateUserDTO u) {
        try {
            userService.createUser(u);
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
//    // TODO We should look at restructuring/refactoring this. Duplicate of the User GET mappings
//    @GetMapping(path = "/pantry")
//    public @ResponseBody Pantry
//    getUserPantry(@RequestParam(required = false) Long id, @RequestParam(required = false) String email) {
//        return pantryService.getPantryByUserID(id);
//    }
    @PutMapping(path = "/pantry/{id}/increase")
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
    @PutMapping(path = "/pantry/{id}/decrease")
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


    @GetMapping(path = "/pantry")
    public @ResponseBody Iterable<Pantry>
    getAllPantrys() {
        log.info("Returning pantries");
        return pantryService.getAllPantrys();
    }

    @GetMapping(path= "/pantry/{pantryId}")
    public @ResponseBody Pantry
    getPantryByPantryID(@PathVariable Long pantryId)
    {
        return pantryService.getPantryByPantryID(pantryId);
    }
}

