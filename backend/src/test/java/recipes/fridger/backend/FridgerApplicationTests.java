package recipes.fridger.backend;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import recipes.fridger.backend.controller.RecipeController;
import recipes.fridger.backend.crud.Recipes;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class FridgerApplicationTests {

    @Autowired
    RecipeController recipeController;
    @Autowired
    RecipeController ingredientController;
    @Autowired
    RecipeController pantryService;
    @Autowired
    RecipeController goalService;
    @Autowired
    RecipeController userService;

    @Test
    public void recipeContextLoads() {
        Assertions.assertThat(recipeController).isNotNull();
    }
    @Test
    public void ingredientContextLoads() {
        Assertions.assertThat(ingredientController).isNotNull();
    }
    @Test
    public void pantryContextLoads() {
    Assertions.assertThat(pantryService).isNotNull();
}
    @Test
    public void goalContextLoads() {
        Assertions.assertThat(goalService).isNotNull();
        }
        @Test
    public void userContextLoads() {
        Assertions.assertThat(userService).isNotNull();
        }

}