package recipes.fridger.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.service.RecipeService;
import recipes.fridger.backend.service.RecipeServiceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RecipeControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @MockBean
    RecipeService RecipeService;
//
//    private Recipes recipes;
//
//   Recipe RECORD_1 = new Recipe(1L,"Test 1","author","description","img_src","body", 20,10,10,10,"ids",20.20,"types",false,"test", 4.3);
//   Recipe RECORD_2 = new Recipe(2L,"Test 2","author","description","img_src","body", 20,10,10,10,"ids",20.20,"types",false,"test", 4.3);
//   Recipe RECORD_3 = new Recipe(3L,"Test 3","author","description","img_src","body", 20,10,10,10,"ids",20.20,"types",false,"test", 4.3);
//
//    @Test
//    public void getAllRecords_success() throws Exception {
//        List<Recipe> records = new ArrayList<>(Arrays.asList(RECORD_1, RECORD_2, RECORD_3));
//        Mockito.when(recipes.findAll()).thenReturn(records);
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/v1/recipe/")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(3)))
//                .andExpect(jsonPath("$[0].title", is("Test 1")));
//    }
}
