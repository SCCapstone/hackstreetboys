package recipes.fridger.backend.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.when;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.service.UserService;
import recipes.fridger.backend.service.UserServiceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Date;
import java.util.Calendar;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    @Test
	public void contextLoads() throws Exception {
		assertThat(userService).isNotNull();
	}

    @Test
    public void createAndAuthUser() throws Exception {
        User user = new User();
        // Deprecated
        // user.setType("NORMAL");
        user.setEmail("seonghopark@gmail.com");
        user.setPassword("password");
        user.setName("Seongho Park");
        user.setBio("I am seongho park");

        Calendar dob = Calendar.getInstance();
        dob.set(Calendar.YEAR, 1990);
        dob.set(Calendar.MONTH, Calendar.JANUARY);
        dob.set(Calendar.DAY_OF_MONTH, 1);

        user.setDob(dob.getTime());
        user.setHeight_in(72);
        user.setWeight_lb(160.0);

        when(userService.authenticateUser("seonghopark@gmail.com", "password")).thenReturn(user);

        this.mockMvc.perform(
            post("http://localhost:8080" + "/v1/user/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(mapper.writeValueAsString(user))
        ).andExpect(status().isOk());

        assertEquals(
            userService.authenticateUser(
                "seonghopark@gmail.com",
                "password"
            ),
            user
        );
    }
}