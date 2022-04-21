package recipes.fridger.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Date;

import com.fasterxml.jackson.databind.ObjectMapper;

import recipes.fridger.backend.dto.CreateAuthRequestDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.security.services.UserDetailsImpl;
import recipes.fridger.backend.security.services.UserDetailsServiceImpl;
import recipes.fridger.backend.service.UserService;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @MockBean
    UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
	public void contextLoads() throws Exception {
        assertNotNull(userService);
	}

    @Test
    public void testRegisterUser() throws Exception {
        CreateUserDTO u = new CreateUserDTO();
        u.setEmail("seonghopark@gmail.com");
        u.setPassword("password");
        u.setName("Seongho Park");
        u.setBio("I am Seongho Park");
        u.setDob(new Date());
        u.setHeight_in(72);
        u.setWeight_lb(172.0);

        this.mockMvc.perform(
            post("http://localhost:8080" + "/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(u))
        ).andExpect(status().isOk());
    }

    @Test
    public void testAuthenticateUser() throws Exception {
        User user = new User();
        user.setEmail("seonghopark@gmail.com");
        user.setPassword(passwordEncoder.encode("password"));
        user.setName("Seongho Park");
        user.setBio("I am seongho park");
        user.setEnabled(true);

        CreateAuthRequestDTO req = new CreateAuthRequestDTO("seonghopark@gmail.com", "password");

        when(userService.getUserByEmail("seonghopark@gmail.com")).thenReturn(user);
        when(userDetailsServiceImpl.loadUserByUsername("seonghopark@gmail.com"))
            .thenReturn(UserDetailsImpl.build(user));

        userService.saveRegisteredUser(user);
        assertEquals(userService.getUserByEmail("seonghopark@gmail.com"), user);

        this.mockMvc.perform(
            post("http://localhost:8080" + "/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(req))
        ).andExpect(status().isOk());
    }
}
