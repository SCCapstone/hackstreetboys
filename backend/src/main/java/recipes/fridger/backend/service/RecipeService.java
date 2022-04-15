package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.dto.UpdateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

import java.util.List;
//Interfacr for recipes
public interface RecipeService {
    //interface for all methods
    //Creates recipe, takes in recipe DTO
    public void createRecipe(CreateRecipeDTO dto);
    //Deletes recipe, takes in recipe id
    public void deleteRecipe(Long id);
    //Updates recipe, takes in recipe and the recipe DTO
    public void updateRecipe(Long id, UpdateRecipeDTO r) throws Exception;
    //Gets recipe by id
    public Recipe getRecipe(Long id);
    //Gets all recipes that match the inputted optionals
    public Iterable<Recipe> getRecipes(Long id, Integer cookTime, Integer prepTime, Double estimatedCost, Double rating, String tags, String type, String ingredientIds, String title);
    //Gets all recipes with this title and author
    Object recipeByTitleAndAuthor(String title, Integer author);

}
