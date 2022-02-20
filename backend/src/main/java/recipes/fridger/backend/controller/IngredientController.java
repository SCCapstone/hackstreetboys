package recipes.fridger.backend.controller;
import java.util.*;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.crud.Ingredients;
import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.dto.ReturnIngredientDTO;
import recipes.fridger.backend.dto.UpdateIngredientDTO;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.service.IngredientService;

@Controller
@Slf4j
@ResponseBody
@RequestMapping(path = "/v1/ingredient")
public class IngredientController {
    @Autowired
    private Ingredients ingredients;
    @Autowired
    private IngredientService ingredientService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createIngredient(@RequestBody @Valid CreateIngredientDTO i) {
        try {
            ingredientService.createIngredient(i);
            log.info("Successful creation of ingredient");
            log.info(String.valueOf(i));
            return ResponseEntity.ok("Created ingredient");
        } catch (Exception e) {
            log.warn("Unable to create ingredient\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create ingredient\n" + e.getMessage());
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<String>
    createIngredient(@RequestBody @Valid UpdateIngredientDTO i) {
        try {
            ingredientService.updateIngredient(i.getId(),i);
            log.info("Log:" + String.valueOf(i));
            log.info("Successful update of ingredient");
            return ResponseEntity.ok("Updated Ingredient");

        } catch (Exception e) {
            log.warn("Unable to update ingredient\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to update ingredient\n" + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Long id) {
        try {
            ingredientService.deleteIngredient(id);
            log.info("Successfully deleted ingredient #" + id);
            return ResponseEntity.ok("Deleted ingredient");
        } catch (Exception e) {
            log.warn("Unable to delete ingredient\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to delete ingredient");
        }
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Ingredient getIngredient(@PathVariable Long id) {
        return ingredientService.getIngredient(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Ingredient>
    getIngredients(@RequestParam(required = false) Long id,
                   @RequestParam(required = false) String name,
                   @RequestParam(required = false) Integer calories,
                   @RequestParam(required = false) Integer carbohydrates,
                   @RequestParam(required = false) Integer protein,
                   @RequestParam(required = false) Integer fat,
                   @RequestParam(required = false) Boolean alcohol,
                   @RequestParam(required = false) Double cost)
            {
        return ingredientService.getIngredients(id, name, calories, carbohydrates, protein, fat, alcohol, cost);
    }
}