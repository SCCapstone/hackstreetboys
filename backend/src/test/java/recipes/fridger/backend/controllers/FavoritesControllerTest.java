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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.when;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import recipes.fridger.backend.controller.FavoriteController;
import recipes.fridger.backend.crud.Favorites;
import recipes.fridger.backend.dto.CreateFavoriteDTO;
import recipes.fridger.backend.model.Favorite;
import recipes.fridger.backend.service.FavoritesService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class FavoritesControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    FavoritesService favoriteService;

    @Autowired
    ObjectMapper mapper;
    @Test
    public void favoriteServiceContextLoads() {
        Assertions.assertThat(favoriteService).isNotNull();
    }

    //Setup Test Data
    Favorites favorites;
    Long userId = Long.valueOf(1);
    Long recipeId = Long.valueOf(2);

    @Test
    @WithMockUser
    public void createFavoriteAndCheck() throws Exception {
        Favorite f = new Favorite();
        f.setUserId(userId);
        f.setRecipeId(recipeId);
        when(favoriteService.checkIfExists(userId,recipeId)).thenReturn(java.util.Optional.of(f));

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/favorites/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(f))
        ).andExpect(status().isOk());
        assertEquals(
                favoriteService.checkIfExists(
                        userId,
                        recipeId
                ),
                f
        );
    }


}
