package recipes.fridger.backend.controller;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import recipes.fridger.backend.service.UserService;

import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.ReturnUserDTO;

@RestController
@RequestMapping(path = "/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/")
    public @ResponseBody ReturnUserDTO
    authenticateUser(@RequestBody CreateAuthRequestDTO u) {
        User authed = userService.authenticateUser(u.getEmail(), u.getPassword());
        if (authed == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        ReturnUserDTO toRet = new ReturnUserDTO();
        toRet.convertFromUser(authed);
        return toRet;
    }
}
