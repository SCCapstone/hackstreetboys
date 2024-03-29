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
import recipes.fridger.backend.controller.RecipeController;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.service.RecipeService;
import recipes.fridger.backend.service.UserService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    RecipeService recipeService;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    @Test
    public void recipeServiceContextLoads() {
        Assertions.assertThat(recipeService).isNotNull();
    }
    //Setup Test Data
    Recipes recipes;
    String title = "Toasty Crunch";
    Long author = 1L;
    String description = "Description of X192918";
    String body = "Body of X192918";
    String imgSrc = "https://assets.apf.cloud/img/fridger_banner.png";
    Integer prepTime = 10;
    Integer cookTime = 10;
    Integer yield = 10;
    Double estimatedCost = 12.99;
    String type = "american";
    boolean alcoholic = false;
    double rating = 2.59;
    String tags = "test";
    String ingredientIds = "1,2,3";

    //Security Tests
    @Test
    @WithMockUser
    public void createRecipeAsUser() throws Exception {
        //Create Pantry
        Recipe r = new Recipe(); //this will generate random id
        r.setId(123L);
        r.setAuthor(123);
        r.setAuthorName("James");
        r.setTitle(title);
        r.setAuthor(author);
        r.setDescription(description);
        r.setBody(body);
        r.setImgSrc(imgSrc);
        r.setTotalTime(prepTime+cookTime);
        r.setPrepTime(prepTime);
        r.setCookTime(cookTime);
        r.setYield(yield);
        r.setEstimatedCost(estimatedCost);
        r.setType(type);
        r.setAlcoholic(alcoholic);
        r.setRating(rating);
        r.setTags(tags);
        r.setIngredientIds(ingredientIds);
        when(recipeService.getRecipe(123L)).thenReturn(r);
        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/recipe/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(r))
        ).andExpect(status().isOk());
    }
    @Test
    @WithMockUser
    public void deleteRecipeAsUser() throws Exception {
        //Create Pantry
        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/recipe/123")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk());
    }


//    @Test
//    public void updateRecipeAsNonUser() throw Exception {
//        Recipe r = new Recipe(); //this will generate random id
//        r.setAuthor(123L);
//        r.setAuthorName("James");
//        r.setTitle(title);
//        r.setAuthor(author);
//        r.setDescription(description);
//        r.setBody("YOYOYO this is not cool");
//        r.setImgSrc(imgSrc);
//        r.setTotalTime(prepTime+cookTime);
//        r.setPrepTime(prepTime);
//        r.setCookTime(cookTime);
//        r.setYield(yield);
//        r.setEstimatedCost(estimatedCost);
//        r.setType(type);
//        r.setAlcoholic(alcoholic);
//        r.setRating(rating);
//        r.setTags(tags);
//        r.setIngredientIds(ingredientIds);
//            this.mockMvc.perform(
//                    put("http://localhost:8080" + "/v1/recipe/4")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(if(r.){mapper.writeValueAsString(r)})
//            ).andExpect(status().isUnauthorized());
//
//        }








}
