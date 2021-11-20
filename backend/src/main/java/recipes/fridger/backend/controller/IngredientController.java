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
import recipes.fridger.backend.crud.Ingredients;
import recipes.fridger.backend.dto.CreateIngredientDTO;
import recipes.fridger.backend.dto.ReturnIngredientDTO;
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
            return ResponseEntity.ok("Created ingredient");
        } catch (Exception e) {
            log.warn("Unable to create ingredient\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create ingredient\n" + e.getMessage());
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
    getIngredients(@RequestParam(required = false) Long id){
        return ingredientService.getIngredients(id);
    }
}