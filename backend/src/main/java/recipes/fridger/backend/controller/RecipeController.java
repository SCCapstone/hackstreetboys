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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.crud.Recipes;
import recipes.fridger.backend.dto.CreateRecipeDTO;
import recipes.fridger.backend.dto.ReturnRecipeDTO;
import recipes.fridger.backend.dto.UpdateRecipeDTO;
import recipes.fridger.backend.model.Recipe;
import recipes.fridger.backend.service.RecipeService;
@Controller
@Slf4j
@ResponseBody
@RequestMapping(path = "/v1/recipe")
//@RestController
public class RecipeController {
    //Autowire the recipe object and the recipe service layer
    @Autowired
    private Recipes recipes;
    @Autowired
    private RecipeService recipeService;
//Later....
    //    @Autowired
//    private ModelMapper modelMapper;
    //Allows a user or an admin to create a post request, through a DTO which is passed to the recipe service layer
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping(path = "/")
    public ResponseEntity<String>
    createRecipe(@RequestBody @Valid CreateRecipeDTO r) {
        try {
            //Create recipe pass
            recipeService.createRecipe(r);
            log.info("Log:" + String.valueOf(r));
            log.info("Successful creation of recipe");
            return ResponseEntity.ok(r.toString());

        } catch (Exception e) {
            log.warn("Unable to create recipe\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create recipe\n" + e.getMessage());
        }
    }
    //Allows a user or an admin to create a put request, through a DTO which is passed to the recipe service layer
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping(path = "/")
    public ResponseEntity<String>
    createRecipe(@RequestBody @Valid UpdateRecipeDTO r) {
        try {
            //update recipe takes in the recipe id and the recipe dto object
            recipeService.updateRecipe(r.getId(),r);
            log.info("Log:" + String.valueOf(r));
            log.info("Successful update of recipe");
            return ResponseEntity.ok("Updated Recipe");

        } catch (Exception e) {
            log.warn("Unable to update recipe\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to update recipe\n" + e.getMessage());
        }
    }
    //Allows a user or an admin to create a post request, the recipe id which is passed to the recipe service layer
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
        try {
            //delete call passing id
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
    //Get method, calls the recipe service to get that recipe by id
    @GetMapping(path = "/{id}")
    public @ResponseBody Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipe(id);
    }

    //Get method, returns all recipes but allows for parameter filtering through our service/crud
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
        //All fields are optional to allow for api parameters to filter down web requests.
        return recipeService.getRecipes(id, cookTime, prepTime, estimatedCost, rating, tags, type, ingredientIds, title);
    }
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(ValidationException.class)
//    String exceptionHandler(ValidationException e) {
//        return e.getMessage();
//    }
}
