package recipes.fridger.backend.controller;
import java.util.*;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.dto.ReturnRecipeDTO;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.service.RecipeService;

@Controller
@Slf4j
@ResponseBody
@RequestMapping(path = "/v1/recipe")
public class RecipeController {
    @Autowired
    private Recipes recipes;
    @Autowired
    private RecipeService recipeService;
//Later....
    //    @Autowired
//    private ModelMapper modelMapper;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createRecipe(@RequestBody @Valid CreateRecipeDTO r) {
        try {
            recipeService.createRecipe(r);
            log.info("Successful creation of recipe");
            return ResponseEntity.ok("Created recipe");
        } catch (Exception e) {
            log.warn("Unable to create recipe\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create recipe\n" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/{id}")

    public ResponseEntity<String> deleteRecipe(@PathVariable Integer id) {
        try {
            recipeService.deleteRecipe(id);
            log.info("Successfully deleted recipe #" + id);
            return ResponseEntity.ok("Deleted recipe");
        } catch (Exception e) {
            log.warn("Unable to delete recipe\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to delete recipe");
        }
    }

//    @GetMapping(path = "/{id}")
//    public @ResponseBody
//    ReturnRecipeDTO getRecipe(@PathVariable Integer id) {
//        try {
//            Recipe o = recipeService.getRecipe(id);
//            ReturnRecipeDTO recipeReturn = modelMapper.map(o, ReturnRecipeDTO.class);
//            return recipeReturn;
//        } catch (Exception e) {
//            return null;
//        }
//    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Recipe getRecipe(@PathVariable Integer id) {
        return recipeService.getRecipe(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Recipe>
    getRecipes(@RequestParam(required = false) Integer id){
        return recipeService.getRecipes(id);
    }
}
