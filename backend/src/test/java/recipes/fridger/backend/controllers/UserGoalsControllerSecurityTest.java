package recipes.fridger.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import recipes.fridger.backend.controller.UserController;
import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.model.Goal;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserGoalsControllerSecurityTest {

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @MockBean
    Pantries pantryRepo;

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

    @Test
    public void createGoalNotAUser() throws Exception {

        Goal goal = new Goal();
        goal.setCalories(500);
        goal.setCurrentWeight(180.0);
        goal.setGoalWeight(190.0);


        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/goal")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(goal))
                ).andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteGoalNotAUser() throws Exception {

        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/user/goal/1")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }

    @Test
    public void getGoalsNotAUser() throws Exception {

        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/goals")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }

    @Test
    public void getGoalByIDNotAUser() throws Exception {

        this.mockMvc.perform(
                get("http://localhost:8080" + "/v1/user/goal/1")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
    }

}
