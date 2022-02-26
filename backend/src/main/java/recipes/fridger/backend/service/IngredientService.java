package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.dto.UpdateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;

public interface IngredientService {
    public void createIngredient(CreateIngredientDTO dto);
    public void deleteIngredient(Long id);
    public void updateIngredient(Long id, UpdateIngredientDTO i) throws Exception;
    public Ingredient getIngredient(Long id);
//    public Ingredient getIngredientByName(String name);
    public Iterable<Ingredient> getIngredients(Long id, String name, Integer calories, Integer carbohydrates, Integer protein, Integer fat, Boolean alcohol, Double cost);

}