package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class RecipeServiceImpl implements RecipeService{

    @Autowired
    private Recipes recipes;
    @Override
    public void createRecipe(CreateRecipeDTO dto) {
        Recipe r = new Recipe();
        r.setTitle(dto.getTitle());
        r.setAuthor(dto.getAuthor());
        r.setDescription(dto.getDescription());
        r.setBody(dto.getBody());
        r.setImgSrc(dto.getImgSrc());
        r.setTotalTime((dto.getCookTime()+dto.getPrepTime()));
        r.setPrepTime(dto.getPrepTime());
        r.setCookTime(dto.getCookTime());
        r.setYield(dto.getYield());
        r.setEstimatedCost(dto.getEstimatedCost());
        r.setType(dto.getType());
        //We have not established the alcohol feature yet.
        r.setAlcoholic(dto.getAlcoholic());
        //Fake values for ratings testing...
        r.setRating(ThreadLocalRandom.current().nextDouble(0, 5));
        //dto.getAlcoholic()
        r.setTags(dto.getTags());
        r.setIngredientIds(dto.getIngredientIds());
        recipes.save(r);
//        System.out.println(r.toString());
    }
    @Transactional
    @Override
    public void deleteRecipe(Long id) {
        Optional<Recipe> recipe = recipes.findById(id);
        if (recipe.isPresent()) {
            Recipe r = recipe.get();
            recipes.delete(r);
        }
    }
    @Transactional
    @Override
    public Recipe getRecipe(Long id) {
        Optional<Recipe> recipe = recipes.findById(id);
        if (recipe.isPresent()) {
            return recipe.get();
        }
        return null;
    }

    @Transactional
    @Override
    public Recipe recipeByTitleAndAuthor(String title, String author) {
        return recipes.findByTitleAndAuthor(title, author);
    }

    @Transactional
    @Override
    public Iterable<Recipe> getRecipes(Long id, Integer cookTime, Integer prepTime, Double estimatedCost, Double rating, String tags, String type, String ingredientIds, String title) {
        return recipes.find(id, cookTime, prepTime, estimatedCost, rating, tags, type, ingredientIds, title);
    }
}
