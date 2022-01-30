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

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.controller.RecipeController;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.service.RecipeService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    RecipeService recipeService;

    @Autowired
    ObjectMapper mapper;
    @Test
    public void recipeServiceContextLoads() {
        Assertions.assertThat(recipeService).isNotNull();
    }

    //Setup Test Data
    Recipes recipes;
    String title = "Recipe X192918";
    String author = "Author of X192918";
    String description = "Description of X192918";
    String body = "Body of X192918";
    String imgSrc = "cdn.x1929918.internal";
    Integer prepTime = 10;
    Integer cookTime = 10;
    Integer yield = 10;
    Double estimatedCost = 12.99;
    String type = "X192918 Type";
    boolean alcoholic = false;
    double rating = 2.59;
    String tags = "X192918 Tag One, X192918 Tag Two";
    String ingredientIds = "23223,213213,123213";

    @Test
    public void createRecipeAndCheck() throws Exception {
        Recipe r = new Recipe();
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
        when(recipeService.recipeByTitleAndAuthor(title,author)).thenReturn(r);

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/recipe/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(r))
        ).andExpect(status().isOk());
        assertEquals(
                recipeService.recipeByTitleAndAuthor(
                        title,
                        author
                ),
                r
        );
    }


}
