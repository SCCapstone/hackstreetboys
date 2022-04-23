package recipes.fridger.backend.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.With;
import org.assertj.core.api.Assertions;
import org.checkerframework.checker.units.qual.C;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.when;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.controller.IngredientController;
import recipes.fridger.backend.crud.Ingredients;
import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.service.IngredientService;
import recipes.fridger.backend.service.UserService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class IngredientControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    IngredientService ingredientService;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    @Test
    public void ingredientServiceContextLoads() {
        Assertions.assertThat(ingredientService).isNotNull();
    }

    //Setup Test Data
    Ingredients ingredients;
    String name = "Big Ole Eggplant";
    Integer calories = 20;
    Integer carbohydrates = 5;
    Integer protein = 0;
    Integer fat = 0;
    Boolean alcohol = false;
    Double cost = .79;
    String imgSrc = "https://solidstarts.com/wp-content/uploads/photo7-scaled.jpg";

    @Test
    @WithMockUser
    public void createIngredientAsUser() throws Exception {
        Ingredient i = new Ingredient();
        i.setId(123L);
        i.setName(name);
        i.setCalories(calories);
        i.setCarbohydrates(carbohydrates);
        i.setProtein(protein);
        i.setFat(fat);
        i.setAlcohol(alcohol);
        i.setCost(cost);
        i.setImgSrc(imgSrc);
        when(ingredientService.getIngredient(123L)).thenReturn(i);
        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/ingredient/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(i))
        ).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void deleteIngredientAsUser() throws Exception {
        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/ingredient/123")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }

}
