package recipes.fridger.backend.controller;
import java.util.*;

import javax.validation.Valid;
import javax.validation.ValidationException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
//@RestController
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
            log.info("Log:" + String.valueOf(r));
            log.info("Successful creation of recipe");
            return ResponseEntity.ok(r.toString());

        } catch (Exception e) {
            log.warn("Unable to create recipe\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create recipe\n" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
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
//    ReturnRecipeDTO getRecipe(@PathVariable Long id) {
//        try {
//            Recipe o = recipeService.getRecipe(id);
//            ReturnRecipeDTO recipeReturn = modelMapper.map(o, ReturnRecipeDTO.class);
//            return recipeReturn;
//        } catch (Exception e) {
//            return null;
//        }
//    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipe(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Recipe>
    getRecipes(@RequestParam(required = false) Long id,
    @RequestParam(required = false) Integer cookTime,
    @RequestParam(required = false) Integer prepTime,
    @RequestParam(required = false) Double estimatedCost,
    @RequestParam(required = false) Double rating,
    @RequestParam(required = false) String tags,
    @RequestParam(required = false) String type,
    @RequestParam(required = false) String ingredientIds,
    @RequestParam(required = false) String title)
    {
        return recipeService.getRecipes(id, cookTime, prepTime, estimatedCost, rating, tags, type, ingredientIds, title);
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ValidationException.class)
    String exceptionHandler(ValidationException e) {
        return e.getMessage();
    }
}
