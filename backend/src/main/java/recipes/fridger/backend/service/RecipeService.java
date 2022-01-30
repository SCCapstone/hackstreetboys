package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

import java.util.List;

public interface RecipeService {
    public void createRecipe(CreateRecipeDTO dto);
    public void deleteRecipe(Long id);
    public Recipe getRecipe(Long id);
    public Iterable<Recipe> getRecipes(Long id, Integer cookTime, Integer prepTime, Double estimatedCost, Double rating, String tags, String type, String ingredientIds, String title);
    Object recipeByTitleAndAuthor(String title, String author);
}
