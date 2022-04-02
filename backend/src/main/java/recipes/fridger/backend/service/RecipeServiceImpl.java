package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.crud.Reviews;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.dto.UpdateRecipeDTO;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.model.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private Recipes recipes;
    @Autowired
    private Users users;
    @Autowired
    private Reviews reviews;
    @Transactional
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
        r.setRating(0.0);
        //We have not established the alcohol feature yet.
        r.setAlcoholic(dto.getAlcoholic());
        //Fake values for ratings testing...
        //dto.getAlcoholic()
        r.setTags(dto.getTags());
        r.setIngredientIds(dto.getIngredientIds());
        recipes.save(r);
//        System.out.println(r.toString());
    }
    @Transactional
    @Override
    public void updateRecipe(Long id, UpdateRecipeDTO dto) throws  Exception{
        System.out.println("Passed id: " + id);
        System.out.println("DTO ID:" + dto.getId());
        System.out.println("DTO Long ID:" + dto.getId().longValue());
        System.out.println(dto);
       System.out.println(recipes.findAll());
        Optional<Recipe> optionalRecipe = recipes.findById(dto.getId().longValue());
        if(optionalRecipe.isPresent()){
            Recipe r = optionalRecipe.get();
            System.out.println("Recipe fetched");
            if(dto.getTitle() != null &&  dto.getTitle().length() > 0){
                r.setTitle(dto.getTitle());
            }
            if(dto.getBody() != null && dto.getBody().length() > 0){
                r.setBody(dto.getBody());
            }
            if(dto.getAlcoholic() != null){
                r.setAlcoholic(dto.getAlcoholic());
            }
            if(dto.getDescription() != null && dto.getDescription().length() > 0){
                r.setDescription(dto.getDescription());
            }
            if(dto.getImgSrc() != null && dto.getImgSrc().length() > 0){
                r.setImgSrc(dto.getImgSrc());
            }
            if(dto.getCookTime() != null && dto.getCookTime() > 0){
                r.setCookTime(dto.getCookTime());
            }
            if(dto.getEstimatedCost() != null && dto.getEstimatedCost() > 0){
                r.setEstimatedCost(dto.getEstimatedCost());
            }
            if(dto.getIngredientIds() != null && dto.getIngredientIds().length()>0){
                r.setIngredientIds(dto.getIngredientIds());
            }
            if(dto.getPrepTime() != null && dto.getPrepTime() > 0){
                r.setPrepTime(dto.getPrepTime());
            }
            if(dto.getType() != null  && dto.getIngredientIds().length()>0){
                r.setType(dto.getType());
            }
            if(dto.getYield()!=null && dto.getYield() > 0){
                r.setYield(dto.getYield());
            }
            recipes.save(r);
        }
        else{
            System.out.println("No Recipe Found!");
        }
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
        Optional<Recipe> optionalRecipe = recipes.findById(id);
        if (optionalRecipe.isPresent()) {
            Recipe r = optionalRecipe.get();
//            Optional<Double> rating = Optional.ofNullable(reviews.getAverageRating(id));
            Double average = reviews.getAverageRating(id);
            r.setRating(average!=null ? average : 0.0);
            r.setTotalTime(r.getCookTime() + r.getPrepTime());
//            System.out.println("individual " + id + " has a rating of " + average);
            recipes.save(r);
            return r;
        }
        return null;
    }

    @Transactional
    @Override
    public Recipe recipeByTitleAndAuthor(String title, Integer author) {
        return recipes.findByTitleAndAuthor(title, author);
    }

    @Transactional
    @Override
    public Iterable<Recipe> getRecipes(Long id, Integer cookTime, Integer prepTime, Double estimatedCost, Double rating, String tags, String type, String ingredientIds, String title) {
        List<Recipe> recipesList = recipes.find(id, cookTime, prepTime, estimatedCost, rating, tags, type, ingredientIds, title);
        for(Recipe r : recipesList){
            Double average = reviews.getAverageRating(r.getId());
            r.setRating(average!=null ? average : 0.0);
            r.setAuthorName((users.findById(r.getAuthor()).get().getName() != null ? users.findById(r.getAuthor()).get().getName() : "NaN"));
            r.setTotalTime(r.getPrepTime() + r.getCookTime());
            recipes.save(r);
//            System.out.println(id + " has a rating of " + average);
        }
        return recipesList;

    }
}
