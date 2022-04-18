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

    @Test
    public void testPageNotFound() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/yabigdummy";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        }
    }
    @Test
    public void testRecipeEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/recipe/";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
    }
    @Test
    public void testIngredientEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/ingredient/";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
    }
    @Test
    public void testUserEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/user/";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
    }
    @Test
    public void testGoalEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/user/goals/";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.OK);
        }
    }
    @Test
    public void testPantryEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/v1/user/pantry/";
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (HttpClientErrorException e) {
            Assertions.assertThat(e.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        }
    }
}
