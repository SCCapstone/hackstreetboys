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
import recipes.fridger.backend.controller.ReviewController;
import recipes.fridger.backend.crud.Reviews;
import recipes.fridger.backend.dto.CreateReviewDTO;
import recipes.fridger.backend.model.Review;
import recipes.fridger.backend.service.ReviewService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class ReviewControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    ReviewService reviewService;

    @Autowired
    ObjectMapper mapper;
    @Test
    public void reviewServiceContextLoads() {
        Assertions.assertThat(reviewService).isNotNull();
    }

    //Setup Test Data
    Review review;
    Long authorId = Long.valueOf(1);
    String authorName = "boozer";
    Long recipeId = Long.valueOf(2);
    Integer rating = 4;
    String feedback = "It was good";

    @Test
    @WithMockUser
    public void createReviewAndCheck() throws Exception {
        Review r = new Review();
        r.setAuthorId(authorId);
        r.setAuthorName(authorName);
        r.setRecipeId(recipeId);
        r.setRating(rating);
        r.setFeedback(feedback);
        when(reviewService.checkIfExists(authorId,recipeId, rating, feedback)).thenReturn(java.util.Optional.of(r));

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/review/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(r))
        ).andExpect(status().isOk());
        assertEquals(
                reviewService.checkIfExists(
                        authorId,
                        recipeId,
                        rating,
                        feedback
                ),
                r
        );
    }


}
