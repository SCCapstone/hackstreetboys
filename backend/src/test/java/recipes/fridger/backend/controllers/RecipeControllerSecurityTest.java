package recipes.fridger.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
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
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
public class RecipeControllerSecurityTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    RecipeService recipeService;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper mapper;

    @Test
    public void contextLoads() throws Exception {
        assertThat(userService).isNotNull();
    }
    @Test
    public void recipeServiceContextLoads() {
        Assertions.assertThat(recipeService).isNotNull();
    }
    //Setup Test Data
    Recipes recipes;
    String title = "Toasty Crunch";
    Long author = 123L;
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
    public void createRecipeAsNonUser() throws Exception {
        //Create Pantry
        Recipe r = new Recipe(); //this will generate random id
        r.setAuthor(123L);
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

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/recipe/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(r))
        ).andExpect(status().isUnauthorized());
    }
    @Test
    public void deleteRecipeAsNonUser() throws Exception {
        //Create Pantry
        this.mockMvc.perform(
                delete("http://localhost:8080" + "/v1/recipe/4")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isUnauthorized());
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
