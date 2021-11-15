package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.model.Recipe;

import javax.transaction.Transactional;
import java.util.Optional;
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
        r.setTotalTime((dto.getCookTime()+dto.getPrepTime()));
        r.setPrepTime(dto.getPrepTime());
        r.setCookTime(dto.getCookTime());
        r.setYield(dto.getYield());
        r.setEstimatedCost(dto.getEstimatedCost());
        r.setType(dto.getType());
        r.setAlcoholic(dto.getAlcoholic());
        r.setTags(dto.getTags());
    }
    @Transactional
    @Override
    public void deleteRecipe(Integer id) {
        Optional<Recipe> recipe = recipes.findById(id);
        if (recipe.isPresent()) {
            Recipe r = recipe.get();
            recipes.delete(r);
        }
    }
    @Transactional
    @Override
    public Recipe getRecipe(Integer id) {
        Optional<Recipe> recipe = recipes.findById(id);
        if (recipe.isPresent()) {
            return recipe.get();
        }
        return null;
    }
    @Transactional
    public Iterable<Recipe> getRecipes(Integer userId) {
        return recipes.find(userId);
    }
}