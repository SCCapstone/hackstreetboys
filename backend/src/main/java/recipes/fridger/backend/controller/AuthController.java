package recipes.fridger.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.dto.JwtTokenDTO;
import recipes.fridger.backend.mail.OnRegistrationCompleteEvent;
import recipes.fridger.backend.mail.Utility;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.security.jwt.JwtUtils;
import recipes.fridger.backend.security.services.UserDetailsImpl;
import recipes.fridger.backend.service.UserService;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping(path = "/v1/auth")
public class AuthController {

    @Autowired
    ApplicationEventPublisher eventPublisher;

    @Autowired
    private UserService userService;

    @Autowired
	AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
	JwtUtils jwtUtils;

    //used to verifiy if user has an account
    @PostMapping(path = "/login")
    public ResponseEntity<JwtTokenDTO>
    authenticateUser(@RequestBody CreateAuthRequestDTO u) {

        //If user has not been enabled
        if((userService.getUserByEmail(u.getEmail())).isEnabled()==false) {
            List<String> temp = new ArrayList<String>();
            return new ResponseEntity<JwtTokenDTO>(new JwtTokenDTO("", "", 0L, "", temp), HttpStatus.UNAUTHORIZED);
        }
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(u.getEmail(), u.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtTokenDTO(jwt, "Bearer",
            userDetails.getId(),  
            userDetails.getEmail(), 
            roles));
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String>
    createUser(@RequestBody @Valid CreateUserDTO u, HttpServletRequest request) {
        // Ensure email is unique
        log.info("attempting user create");
        if(userService.getUserByEmail(u.getEmail()) != null) {
            log.info("already exists user" + u.getEmail());
            return ResponseEntity.badRequest().body("Account already exists");
        }
        try {
            //Create user
            User registered = userService.registerNewUserAccount(u, request);
            log.info("Successful creation of user");

            //Send Verification Email To that user
//            String siteURL = Utility.getSiteURL(request); //get site for verification email
//            userService.createVerificationToken(registered, UUID.randomUUID().toString());
//            userService.sendVerificationEmail(registered,siteURL);
//            log.info("Sent email to "+u.getEmail());

            return ResponseEntity.ok("Created user");
        } catch (Exception e) {
            log.warn("Unable to create user\n" + e.getMessage());
            return ResponseEntity.internalServerError().body(
                "Unable to create user\n" + e.getMessage());
        }
    }
    
    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (userService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }

//    @PostMapping(path = "/register")
//    public ResponseEntity<String>
//    createUser(@RequestBody @Valid CreateUserDTO u, HttpServletRequest request, Errors errors) {
//        // Ensure email is unique
//        log.info("attempting user create");
//        if(userService.getUserByEmail(u.getEmail()) != null) {
//            log.info("already exists user" + u.getEmail());
//            return ResponseEntity.badRequest().body("Account already exists");
//        }
//        try {
//            log.info("Entering User Creation");
//            User registered = userService.registerNewUserAccount(u);
//
//            String appURL = request.getContextPath();
//            eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered,request.getLocale(),appURL));
//
//            log.info("Successful creation of user");
//            return ResponseEntity.ok("Created user");
//        } catch (Exception e) {
//            log.warn("Unable to create user\n" + e.getMessage());
//            return ResponseEntity.internalServerError().body(
//                    "Unable to create user\n" + e.getMessage());
//        }
//    }

    @PostMapping(path="/testEmail")
    public String testEmail(@RequestBody @Valid String email) throws MessagingException, UnsupportedEncodingException {

        //user must exist for this to work
        User aeb30 = userService.getUserByEmail(email);
        userService.sendVerificationEmail(aeb30,"https://fridger.recipes");
        return "sent test email";

    }
    @DeleteMapping(path = "/deleteUserAcct")
    public void deleteUser(@RequestBody @Valid String email) {
        if(userService.emailExistsPub(email)) {
            log.info("user exists at this email: "+email);
            userService.deleteUserByEmail(email);
        }
    }
}
