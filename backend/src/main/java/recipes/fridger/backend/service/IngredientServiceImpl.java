package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Ingredients;
import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
@Service
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private Ingredients ingredients;
    @Override
    public void createIngredient(CreateIngredientDTO dto) {
        Ingredient i = new Ingredient();
        i.setName(dto.getName());
        i.setCalories(dto.getCalories());
        i.setCarbohydrates(dto.getCarbohydrates());
        i.setProtein(dto.getProtein());
        i.setFat(dto.getFat());
        i.setAlcohol(dto.getAlcohol());
        i.setCost(dto.getCost());
        i.setImgSrc(dto.getImgSrc());
        ingredients.save(i);
    }
    @Transactional
    @Override
    public void deleteIngredient(Long id) {
        Optional<Ingredient> ingredient = ingredients.findById(id);
        if (ingredient.isPresent()) {
            Ingredient i = ingredient.get();
            ingredients.delete(i);
        }
    }
    @Transactional
    @Override
    public Ingredient getIngredient(Long id) {
        Optional<Ingredient> ingredient = ingredients.findById(id);
        if (ingredient.isPresent()) {
            return ingredient.get();
        }
        return null;
    }
//    @Transactional
//    @Override
//    public Ingredient getIngredientByName(String name) {
//        Optional<Ingredient> ingredient = ingredients.findByName(name);
//        if (ingredient.isPresent()) {
//            return ingredient.get();
//        }
//        return null;
//    }
    @Transactional
    @Override
    public Iterable<Ingredient> getIngredients(Long id, String name, Integer calories, Integer carbohydrates, Integer protein, Integer fat, Boolean alcohol, Double cost) {
        return ingredients.find(id, name, calories, carbohydrates, protein, fat, alcohol, cost);
    }
}