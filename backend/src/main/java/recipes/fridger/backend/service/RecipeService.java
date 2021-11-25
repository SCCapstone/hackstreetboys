package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

public interface RecipeService {
    public void createRecipe(CreateRecipeDTO dto);
    public void deleteRecipe(Long id);
    public Recipe getRecipe(Long id);
    public Iterable<Recipe> getRecipes(Long recipeId);
}
