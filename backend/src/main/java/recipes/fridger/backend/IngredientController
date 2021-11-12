package recipes.fridger.backend;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IngredientController {

    private final AtomicLong counter = new AtomicLong();

    @GetMapping(path = "/ingredient")
    public Ingredient getIngredient(
            @RequestParam(value = "name", defaultValue = "Unnamed Ingredient", required = true) String name,
            @RequestParam(value = "calories", defaultValue = "0", required = true) Integer calories,
            @RequestParam(value = "carbohydrates", defaultValue = "0") Integer carbohydrates,
            @RequestParam(value = "protein", defaultValue = "0") Integer protein,
            @RequestParam(value = "fat",  defaultValue = "0") Integer fat,
            @RequestParam(value = "alcohol", defaultValue = "False", required = true) Boolean alcohol,
            @RequestParam(value = "cost",  defaultValue = "0.0") Double cost
    ) {
        return new Ingredient(counter.incrementAndGet(), name, calories, carbohydrates, protein, fat, alcohol, cost);
    }
}

// NEED TO IMPLEMENT FOR POST
//    @PostMapping(path = "/ingredient")
//    public Ingredient setIngredient(
//            @RequestParam(value = "name", defaultValue = "Unnamed Ingredient", required = true) String name,
//            @RequestParam(value = "calories", defaultValue = "0", required = true) Integer calories,
//            @RequestParam(value = "carbohydrates", defaultValue = "0") Integer carbohydrates,
//            @RequestParam(value = "protein", defaultValue = "0") Integer protein,
//            @RequestParam(value = "fat",  defaultValue = "0") Integer fat,
//            @RequestParam(value = "alcohol", defaultValue = "False", required = true) Boolean alcohol,
//            @RequestParam(value = "cost",  defaultValue = "0.0") Double cost
//
//    ) {
//        return Ingredient;
//    }