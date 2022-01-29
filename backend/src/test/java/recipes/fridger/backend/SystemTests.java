package recipes.fridger.backend;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.apache.el.parser.ParseException;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

import java.util.concurrent.ThreadLocalRandom;

@Data
public class SystemTests {
    @Autowired private JacksonTester<CreateRecipeDTO> json;


//    @Before("")
//    public void setup() throws ParseException {
//        CreateRecipeDTO recipeDTO = new CreateRecipeDTO("Title","Description");
//    }
    Recipes recipes;
    @Test
    public void testCreateReadDelete() {
//        Recipe record = PatientRecord.builder()
//                .name("John Doe")
//                .age(47)
//                .address("New York USA")
//                .build();
//
//        Mockito.when(patientRecordRepository.save(record)).thenReturn(record);
//
//        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/patient")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)
//                .content(this.mapper.writeValueAsString(record));
//
//        mockMvc.perform(mockRequest)
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", notNullValue()))
//                .andExpect(jsonPath("$.name", is("John Doe")));

//        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/recipe/";
        Recipe r = new Recipe();
        r.setId(2992L);
        r.setTitle("New Test Recipe");
        r.setAuthor("Old McDonald");
        r.setDescription("This recipe is a unit test <3");
        r.setBody("This is the body <3");
        r.setImgSrc("insert trololo here");
        r.setTotalTime(45);
        r.setPrepTime(20);
        r.setCookTime(25);
        r.setYield(10);
        r.setEstimatedCost(10.99);
        r.setType("American");
        r.setAlcoholic(false);
        //Fake values for ratings testing...
        r.setRating(ThreadLocalRandom.current().nextDouble(0, 5));
        //dto.getAlcoholic()
        r.setTags("Test");
        r.setIngredientIds("1,2,3,4,5");
//        recipes.save(r);
//        Assertions.assertThat(recipes.findById(2992L).isPresent());
//        recipes.delete(r);
//        Assertions.assertThat(recipes.findById(2992L).isEmpty());

//        ResponseEntity<Recipe> entity = restTemplate.postForEntity(url, r, Recipe.class);
//
////        Assertions.assertThat(entity).toString().contains("Wow");
////        Recipe[] recipes = restTemplate.getForObject(url, Recipe[].class);
////        Assertions.assertThat(recipes).contains("Recipe");
//
//        restTemplate.delete(url + "/" + entity.getBody().getId());
//        Assertions.assertThat(restTemplate.getForObject(url, Recipe[].class)).isEmpty();
    }

    @Test
    public void testErrorHandlingReturnsBadRequest() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/yabigdummy";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        }
    }
}
