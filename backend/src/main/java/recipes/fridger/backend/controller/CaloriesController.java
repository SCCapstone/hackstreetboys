package recipes.fridger.backend.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.crud.Calories;
import recipes.fridger.backend.dto.CreateCaloriesDTO;
import recipes.fridger.backend.service.CaloriesService;
import recipes.fridger.backend.model.Calorie;

import java.util.Date;

@Controller
@Slf4j
@ResponseBody
@RequestMapping(path = "/v1/calories")
public class CaloriesController {
    @Autowired
    private Calories calories;
    @Autowired
    private CaloriesService caloriesService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createCalorie(@RequestBody @Valid CreateCaloriesDTO c) {

        try {
            caloriesService.createCalorie(c);
            log.info("Successful creation of calories item");
            log.info(String.valueOf(c));
            return ResponseEntity.ok("Created calories");
        } catch (Exception e) {
            log.warn("Unable to create calories\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create calories\n" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteCalorie(@PathVariable Long id) {
        try {
            caloriesService.deleteCalorie(id);
            log.info("Successfully deleted calories #" + id);
            return ResponseEntity.ok("Deleted calories");
        } catch (Exception e) {
            log.warn("Unable to delete calories\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to delete calories");
        }
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Calorie getCalorie(@PathVariable Long id) {
        return caloriesService.getCalorieById(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Calorie>
    getCalories(@RequestParam(required = false) Long id,
                   @RequestParam(required = false) Long userId,
                   @RequestParam(required = false) String title,
                    @RequestParam(required = false) Long calorieCount,
                    @RequestParam(required = false) Date dateAdded)
    {
        return caloriesService.getCalories(id, userId, title, calorieCount, dateAdded);
    }

}
