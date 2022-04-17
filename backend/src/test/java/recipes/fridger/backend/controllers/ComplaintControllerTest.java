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
import recipes.fridger.backend.controller.ComplaintController;
import recipes.fridger.backend.crud.Complaints;
import recipes.fridger.backend.dto.CreateComplaintDTO;
import recipes.fridger.backend.model.Complaint;
import recipes.fridger.backend.service.ComplaintService;

import java.util.concurrent.ThreadLocalRandom;
@SpringBootTest
@AutoConfigureMockMvc
public class ComplaintControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    ComplaintService complaintService;

    @Autowired
    ObjectMapper mapper;
    @Test
    public void complaintServiceContextLoads() {
        Assertions.assertThat(complaintService).isNotNull();
    }

    //Setup Test Data
    Complaint complaint;
    Long authorId = Long.valueOf(1);
    String authorName = "boozer";
    Long recipeId = Long.valueOf(2);
    Integer severity = 4;
    String reason = "It was terrible";

    @Test
    @WithMockUser
    public void createReviewAndCheck() throws Exception {
        Complaint c = new Complaint();
        c.setAuthorId(authorId);
        c.setAuthorName(authorName);
        c.setRecipeId(recipeId);
        c.setSeverity(severity);
        c.setReason(reason);
        when(complaintService.complaintByOthers( authorId, recipeId, severity, reason)).thenReturn(java.util.Optional.of(c));

        this.mockMvc.perform(
                post("http://localhost:8080" + "/v1/complaint/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(c))
        ).andExpect(status().isOk());
        assertEquals(
                complaintService.complaintByOthers(
                        authorId,
                        recipeId,
                        severity,
                        reason
                ),
                c
        );
    }


}
