package recipes.fridger.backend.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.when;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.model.Review;
import recipes.fridger.backend.model.Goal;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.service.PantryService;
import recipes.fridger.backend.service.UserService;
import recipes.fridger.backend.service.GoalService;
import recipes.fridger.backend.service.UserServiceImpl;

import java.math.BigDecimal;
import java.util.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    MockMvc mockMvc;

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

    // Endpoint removed
    // @Test
    // public void createAndAuthUser() throws Exception {
    //     User user = new User();
    //     // Deprecated
    //     // user.setType("NORMAL");
    //     user.setEmail("seonghopark@gmail.com");
    //     user.setPassword("password");
    //     user.setName("Seongho Park");
    //     user.setBio("I am seongho park");

    //     Calendar dob = Calendar.getInstance();
    //     dob.set(Calendar.YEAR, 1990);
    //     dob.set(Calendar.MONTH, Calendar.JANUARY);
    //     dob.set(Calendar.DAY_OF_MONTH, 1);

    //     user.setDob(dob.getTime());
    //     user.setHeight_in(72);
    //     user.setWeight_lb(160.0);

    //     when(userService.authenticateUser("seonghopark@gmail.com", "password")).thenReturn(user);

    //     this.mockMvc.perform(
    //         post("http://localhost:8080" + "/v1/user/")
    //         .contentType(MediaType.APPLICATION_JSON)
    //         .content(mapper.writeValueAsString(user))
    //     ).andExpect(status().isOk());

    //     assertEquals(
    //         userService.authenticateUser(
    //             "seonghopark@gmail.com",
    //             "password"
    //         ),
    //         user
    //     );
    // }
    @Test
    public void createPantryItem() throws Exception {
        //Create Pantry
        Pantry pantryTest1 = new Pantry(); //this will generate random id

        pantryTest1.setUserID(123L);
        pantryTest1.setIngredientName("banana");
        pantryTest1.setNumIngredient(3.0);
        pantryTest1.setDescription("this is a banana for monkeys");

        when(pantryService.getSinglePantryByUser(123L)).thenReturn(pantryTest1);

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest1))
        ).andExpect(status().isOk());

        //TEST to see if data passed in correctly
        //banana=banana etc.

        //assertEquals(1234567890L,pantryTest1.getUserID());
        assertEquals(
                pantryService.getPantryByUserID(123L), pantryTest1
        );
    }
    @Test
    public void createTwoPantryItemsWithDifferentUsers() throws Exception {
        //Create Pantry Objects
        Pantry pantryTest1 = new Pantry(); //this will generate random id
        pantryTest1.setUserID(123L);
        pantryTest1.setIngredientName("banana");
        pantryTest1.setNumIngredient(3.0);
        pantryTest1.setDescription("this is a banana for monkeys");

        Pantry pantryTest2 = new Pantry(); //this will generate random id
        pantryTest2.setUserID(256L);
        pantryTest2.setIngredientName("apple");
        pantryTest2.setNumIngredient(1.0);
        pantryTest2.setDescription("this is an apple for test");

        List<Pantry> pantries = new ArrayList<Pantry>();
        pantries.add(pantryTest1);
        pantries.add(pantryTest2);

        when(pantryService.getSinglePantryByUser(123L)).thenReturn(pantryTest1);
        when(pantryService.getSinglePantryByUser(256L)).thenReturn(pantryTest2);
        doReturn(pantries).when(pantryService).getAllPantrys();
//        when(pantryService.getAllPantrys()).thenReturn(pantries);

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest1))
        ).andExpect(status().isOk());

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/user/pantry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(pantryTest2))
        ).andExpect(status().isOk());

        //TEST to see if data passed in correctly
        //banana=banana etc.

//        Pantry pantry0 = pantries.get(0);
        //assertEquals(1234567890L,pantryTest1.getUserID());
         //this is not building for some reason, NEEDED WHEN mocking
        //assertEquals(pantryService.getPantryByUserID(256L), pantryTest2);

        assertAll("Each pantry should have been added and returned",
            () -> assertEquals(pantryService.getPantryByUserID(123L), pantryTest1)
            ,() -> assertEquals(pantryService.getPantryByUserID(256L), pantryTest2)
            ,() -> assertEquals(pantryService.getAllPantrys(), pantries)
        );

    }

    @Test
    public void goalServiceContextLoads() {
        Assertions.assertThat(goalService).isNotNull();
    }

    //Setup Test Data
    Goal goal;
    String endGoal ="lose weight";
    Integer calories = 120;
    Integer carbohydrates = 20;
    Integer protein = 4;
    Integer fat = 8;
    Double currentWeight = Double.valueOf(200);
    Double goalWeight = Double.valueOf(150);
    Long userId = Long.valueOf(2);

    @Test
    @WithMockUser
    public void createGoalAndCheck() throws Exception {
        Goal g = new Goal();
        g.setEndGoal(endGoal);
        g.setCalories(calories);
        g.setCarbohydrates(carbohydrates);
        g.setProtein(protein);
        g.setFat(fat);
        g.setCurrentWeight(currentWeight);
        g.setGoalWeight(goalWeight);
        g.setUserId(userId);
        when(goalService.goalCheck(endGoal, calories, carbohydrates, protein, fat, currentWeight, goalWeight, userId)).thenReturn(java.util.Optional.of(g));

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/goals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(g))
        ).andExpect(status().isOk());
        assertEquals(
                goalService.goalCheck(
                        endGoal,
                        calories,
                        carbohydrates,
                        protein,
                        fat,
                        currentWeight,
                        goalWeight,
                        userId
                ),
                g
        );
    }
}