package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;

public interface IngredientService {
    public void createIngredient(CreateIngredientDTO dto);
    public void deleteIngredient(Long id);
    public Ingredient getIngredient(Long id);
    public Iterable<Ingredient> getIngredients(Long recipeId);
}