package recipes.fridger.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;
import recipes.fridger.backend.service.PantryService;

import java.beans.BeanProperty;

import javax.validation.Valid;

@RestController
@Slf4j
@ResponseBody
@RequestMapping(path="/v1/pantry") //TODO change later
public class PantryController {

    @Autowired
    private Pantry pantries;

    @Autowired
    private PantryService pantryService;

    @PostMapping(path = "/") //TODO create path
    public ResponseEntity<String> createPantry(@RequestBody @Valid CreatePantryDTO p) {
        try {
            pantryService.createPantry(p);
            log.info("Successful creation of pantry");
            return ResponseEntity.ok("Created pantry");
        } catch (Exception e) {
            log.warn("Unable to create pantry\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create pantry" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/TBD") //TODO create path
    public ResponseEntity<String> deletePantry(@PathVariable Integer id) {
        try {
            pantryService.deletePantry(id);
            log.info("Successfully delete pantry #"+id);
            return ResponseEntity.ok("Deleted recipe");
        } catch (Exception e) {
            log.warn("Unable to delete recipe #" +id);
            return ResponseEntity.internalServerError().body("Unable to delete recipe");
        }
    }
    @GetMapping(path = "/TBD") //TODO create path
    public @ResponseBody Pantry getPantry(@PathVariable Integer id) {
        return pantryService.getPantry(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Pantry> getPantries(@RequestParam(required = false) Integer id) {
        return pantryService.getAllPantries(id);
    }
}
