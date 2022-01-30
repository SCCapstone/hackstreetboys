package recipes.fridger.backend;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recipes.fridger.backend.controller.AuthController;
import recipes.fridger.backend.controller.IngredientController;
import recipes.fridger.backend.controller.RecipeController;
import recipes.fridger.backend.controller.UserController;
import recipes.fridger.backend.crud.Recipes;
//These tests should be run with shutdown first.

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class FridgerApplicationTests {

    @Autowired
    RecipeController recipeController;
    @Autowired
    IngredientController ingredientController;
    @Autowired
    UserController userController;
    @Autowired
    AuthController authController;

    @Test
    public void recipeControllerContextLoads() {
        Assertions.assertThat(recipeController).isNotNull();
    }
    @Test
    public void ingredientControllerContextLoads() {
        Assertions.assertThat(ingredientController).isNotNull();
    }
    @Test
    public void userControllerContextLoads() {
        Assertions.assertThat(userController).isNotNull();
        }
    @Test
    public void authControllerContextLoads() {
        Assertions.assertThat(authController).isNotNull();
        }

}