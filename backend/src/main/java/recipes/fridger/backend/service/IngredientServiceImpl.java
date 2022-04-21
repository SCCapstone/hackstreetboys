package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Ingredients;
import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.dto.UpdateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
@Service
public class IngredientServiceImpl implements IngredientService{

    @Autowired
    private Ingredients ingredients;
    @Transactional
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
//    @Transactional
//    @Override
//    public void updateIngredient(Long id, UpdateIngredientDTO dto) throws Exception {
//
//        System.out.println("Passed id: " + id);
//        System.out.println("DTO ID:" + dto.getId());
//        System.out.println("DTO Long ID:" + dto.getId().longValue());
//        System.out.println(dto);
//
//        Optional<Ingredient> ingredientOptional = ingredients.findById(dto.getId().longValue());
//        if(ingredientOptional.isPresent()) {
//            Ingredient i = ingredientOptional.get();
//            System.out.println("Ingredient Found. ++");
//            System.out.println(i);
//            if(dto.getName() != null && dto.getName().length() > 0) {
//                i.setName(dto.getName());
//            }
//            if(dto.getCalories() != null && dto.getCalories() >= 0) {
//                i.setCalories(dto.getCalories());
//            }
//            if(dto.getCarbohydrates() != null && dto.getCarbohydrates() >= 0) {
//                i.setCarbohydrates(dto.getCarbohydrates());
//            }
//            if(dto.getProtein() != null && dto.getProtein() >= 0) {
//                i.setProtein(dto.getProtein());
//            }
//            if(dto.getFat() != null && dto.getFat() >= 0) {
//                i.setFat(dto.getFat());
//            }
//            if(dto.getAlcohol() != null) {
//                i.setAlcohol(dto.getAlcohol());
//            }
//            if(dto.getCost() != null && dto.getCost() >= 0) {
//                i.setCost(dto.getCost());
//            }
//            if(dto.getImgSrc() != null && dto.getImgSrc().length() > 0) {
//                i.setImgSrc(dto.getImgSrc());
//            }
////            if(dto.getName() != i.getName()) {
////                i.setName(dto.getName());
////            }
////            if(dto.getCalories() != i.getCalories()) {
////                i.setCalories(dto.getCalories());
////            }
////            if(dto.getCarbohydrates() != i.getCarbohydrates()) {
////                i.setCarbohydrates(dto.getCarbohydrates());
////            }
////            if(dto.getProtein() != i.getProtein()) {
////                i.setProtein(dto.getProtein());
////            }
////            if(dto.getFat() != i.getFat()) {
////                i.setFat(dto.getFat());
////            }
////            if(dto.getAlcohol() != i.getAlcohol()) {
////                i.setAlcohol(dto.getAlcohol());
////            }
////            if(dto.getCost() != i.getCost()) {
////                i.setCost(dto.getCost());
////            }
////            if(dto.getImgSrc() != i.getImgSrc()) {
////                i.setImgSrc(dto.getImgSrc());
////            }
//            ingredients.save(i);
//        } else {
//            System.out.println("No Ingredient Found. --");
//        }
//    }

    @Transactional
    @Override
    public void updateIngredient(Long id, UpdateIngredientDTO dto) throws  Exception{
        System.out.println("Passed id: " + id);
        System.out.println("DTO ID:" + dto.getId());
        System.out.println("DTO Long ID:" + dto.getId().longValue());
        System.out.println(dto);
        System.out.println(ingredients.findAll());
        Optional<Ingredient> optionalIngredient = ingredients.findById(dto.getId().longValue());
        if(optionalIngredient.isPresent()){
            Ingredient i = optionalIngredient.get();
            System.out.println("Ingredient fetched");
            if(dto.getName() != null &&  dto.getName().length() > 0){
                i.setName(dto.getName());
            }
            if(dto.getCalories() != null && dto.getCalories() > 0){
                i.setCalories(dto.getCalories());
            }
            if(dto.getCarbohydrates() != null && dto.getCarbohydrates() > 0){
                i.setCarbohydrates(dto.getCarbohydrates());
            }
            if(dto.getProtein() != null && dto.getProtein() > 0){
                i.setProtein(dto.getProtein());
            }
            if(dto.getFat() != null && dto.getFat() > 0){
                i.setFat(dto.getFat());
            }
            if(dto.getAlcohol() != null){
                i.setAlcohol(dto.getAlcohol());
            }
            if(dto.getCost() != null && dto.getCost() > 0){
                i.setCost(dto.getCost());
            }
            if(dto.getImgSrc() != null &&  dto.getImgSrc().length() > 0){
                i.setImgSrc(dto.getImgSrc());
            }

            ingredients.save(i);
        }
        else{
            System.out.println("No Ingredient Found!");
        }
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