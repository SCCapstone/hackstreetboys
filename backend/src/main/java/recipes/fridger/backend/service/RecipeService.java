package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

public interface RecipeService {
    public void createRecipe(CreateRecipeDTO dto);
    public void deleteRecipe(Integer id);
    public Recipe getRecipe(Integer id);
    public Iterable<Recipe> getRecipes(Integer recipeId);
}
