package recipes.fridger.backend.stale;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/recipe")
    public Recipe recipeBuilder(
            @RequestParam(value = "title", defaultValue="Unknown Title", required = true) String title,
            @RequestParam(value = "author", defaultValue="Unknown Author", required = true) String author,
            @RequestParam(value = "description", defaultValue = "Unknown Description") String description,
            @RequestParam(value = "totalTime", defaultValue = "1") Integer totalTime,
            @RequestParam(value = "prepTime",  defaultValue = "1") Integer prepTime,
            @RequestParam(value = "cookTime", defaultValue = "1") Integer cookTime,
            @RequestParam(value = "yield",  defaultValue = "1") Integer yield,
            @RequestParam(value = "ingredients", defaultValue = "") List<Ingredient> ingredients,
            @RequestParam(value = "estimatedCost", defaultValue = "1") float estimatedCost,
            @RequestParam(value = "type",  defaultValue = "1") String type,
            @RequestParam(value = "alcoholic", required = false, defaultValue = "false") boolean alcoholic,
            @RequestParam(value = "tags", required = false) String[] tags,
            @RequestParam(value = "rating", required = true, defaultValue = "4.2") float rating
            ) {
        return new Recipe(counter.incrementAndGet(), title, author, description, totalTime, prepTime, cookTime, yield, ingredients, estimatedCost, type, alcoholic, tags, rating);
    }
}
