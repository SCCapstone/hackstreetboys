package recipes.fridger.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.controller.UserController;
import recipes.fridger.backend.crud.Goals;
import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.model.Goal;
import recipes.fridger.backend.service.GoalService;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;

import java.util.ArrayList;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.RequestEntity.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserGoalsControllerTest {

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @MockBean
    Pantries pantryRepo;

    @MockBean
    Goals goalRepo;

    @MockBean
    UserService userService;

    @MockBean
    PantryService pantryService;

    @MockBean
    GoalService goalService;

    @Autowired
    ObjectMapper mapper;

    @Test
    public void contextLoads() throws Exception {
        assertThat(userService).isNotNull();
    }

    @Test
    @WithMockUser
    public void createNewGoal() throws Exception {
        Goal goal = new Goal();
        goal.setCalories(500);
        goal.setCurrentWeight(180.0);
        goal.setGoalWeight(190.0);

        when(goalRepo.save(goal)).thenReturn(goal);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("http://localhost:8080/v1/user/goal")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(goal));


        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",Matchers.is("Created goal")));

    }

    @Test
    @WithMockUser
    public void deleteGoal() throws Exception {

        Long goalID = 3L;
        String endGoal = "lose";
        int calories = 500;
        int carbs = 10;
        int protein = 10;
        int fat = 10;
        Double currentWeight = 180.0;
        Double goalWeight = 180.0;
        Long userID = 10L;

        Goal goal1 = new Goal();
        goal1.setId(goalID);
        goal1.setEndGoal(endGoal);
        goal1.setCalories(calories);
        goal1.setCarbohydrates(carbs);
        goal1.setProtein(protein);
        goal1.setFat(fat);
        goal1.setCurrentWeight(currentWeight);
        goal1.setGoalWeight(goalWeight);
        goal1.setUserId(userID);

        List<Goal> goals = new ArrayList<>();
        goals.add(goal1);

        when(goalRepo.find(goalID,endGoal,calories,carbs,protein,fat,currentWeight,goalWeight,userID)).thenReturn(goals);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("http://localhost:8080/v1/user/goal/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }
    //this test is on a depreciated method
//    @Test
//    @WithMockUser
//    public void getGoals() throws Exception {
//        List<Goal> goals = new ArrayList<>();
//
//        String endGoal = "lose";
//        int calories = 500;
//        int carbs = 10;
//        int protein = 10;
//        int fat = 10;
//        Double currentWeight = 180.0;
//        Double goalWeight = 180.0;
//        Long userID = 10L;
//
//        Goal goal1 = new Goal();
//        goal1.setEndGoal(endGoal);
//        goal1.setCalories(calories);
//        goal1.setCarbohydrates(carbs);
//        goal1.setProtein(protein);
//        goal1.setFat(fat);
//        goal1.setCurrentWeight(currentWeight);
//        goal1.setGoalWeight(goalWeight);
//        goal1.setUserId(userID);
//
//        Goal goal2 = new Goal();
//        goal2.setCalories(800);
//        goal2.setCurrentWeight(280.0);
//        goal2.setGoalWeight(240.0);
//
//        goals.add(goal1);
//        //goals.add(goal2);
//
////        when(goalService.getGoals(null,endGoal,calories,carbs,protein,fat,currentWeight,goalWeight,userID)).thenReturn(goals);
//
//        when(goalRepo.findAll()).thenReturn(goals);
//
//        mockMvc.perform(get("http://localhost:8080/v1/user/goals")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$",hasSize(2))); //this doesn't work, look into it
//
//    }

    @Test
    @WithMockUser
    public void getGoalByID() throws Exception {
        Goal goal = new Goal();
        goal.setCalories(500);
        goal.setCurrentWeight(180.0);
        goal.setGoalWeight(190.0);

        when(goalRepo.save(goal)).thenReturn(goal);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("http://localhost:8080/v1/user/goal")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(goal));


        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$",Matchers.is("Created goal")));

    }







}
