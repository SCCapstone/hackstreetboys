package recipes.fridger.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import recipes.fridger.backend.controller.UserController;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserPantryControllerSecurityTest {

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @MockBean
    UserService userService;

    @MockBean
    PantryService pantryService;

    @Autowired
    ObjectMapper mapper;

    @Test
	public void contextLoads() throws Exception {
		assertThat(userService).isNotNull();
	}


    //Security Tests
    @Test
    public void createPantryNotAUser() throws Exception {
        //Create Pantry
        Pantry pantryTest1 = new Pantry(); //this will generate random id

        pantryTest1.setUserID(123L);
        pantryTest1.setIngredientName("banana");
        pantryTest1.setNumIngredient(3.0);
        pantryTest1.setDescription("this is a banana for monkeys");

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest1))
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void deleteAnItemInPantryNotAUser() throws Exception {
        //Create Pantry

        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/user/pantry/4")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void clearPantryNotAUser() throws Exception {

        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/user/pantry/clear-pantry/123")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void IncrementByOneInPantryNotAUser() throws Exception {

        this.mockMvc.perform(
                put("http://localhost:8080" + "/v1/user/pantry/increase/4")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void DecrementByOneInPantryNotAUser() throws Exception {

        this.mockMvc.perform(
                put("http://localhost:8080" + "/v1/user/pantry/decrease/4")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void GetAllPantriesNotAUser() throws Exception {
        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/pantry/")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void GetPantryByIDNotAUser() throws Exception {

        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/pantry/4")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }




}