package recipes.fridger.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice.Return;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.security.jwt.JwtUtils;
import recipes.fridger.backend.security.services.UserDetailsImpl;
import recipes.fridger.backend.service.UserService;

import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.dto.JwtTokenDTO;
import recipes.fridger.backend.dto.ReturnUserDTO;

@RestController
@Slf4j
@RequestMapping(path = "/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
	AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
	JwtUtils jwtUtils;

    @PostMapping(path = "/login")
    public ResponseEntity<JwtTokenDTO>
    authenticateUser(@RequestBody CreateAuthRequestDTO u) {
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
    createUser(@RequestBody @Valid CreateUserDTO u) {
        // Ensure email is unique
        if(userService.getUserByEmail(u.getEmail()) != null)
             return ResponseEntity.badRequest().body("Account already exists");
        
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
}
