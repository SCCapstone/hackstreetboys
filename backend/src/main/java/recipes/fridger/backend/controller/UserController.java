package recipes.fridger.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.service.UserService;

@RestController
@Slf4j
@RequestMapping(path = "/v1/user")
public class UserController {

    @Autowired
    private Users users;

    @Autowired
    private UserService userService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createUser(@RequestBody @Valid CreateUserDTO u) {
        try {
            userService.createUser(u);
            log.info("Successful creation od user");
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

    @GetMapping(path = "/{id}")
    public @ResponseBody User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping(path = "/")
    public @ResponseBody Iterable<User>
    getUsers(@RequestParam(required = false) Long id) {
        return userService.getUsers(id);
    }
}
