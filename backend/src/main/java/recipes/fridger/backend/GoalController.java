package recipes.fridger.backend;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoalController {

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/goal")
    public Goal goalBuilder(
            @RequestParam(value = "endGoal", defaultValue = "lose/gain/maintain", required = true) String endGoal,
            @RequestParam(value = "currentWeight", defaultValue="1", required = true) Integer currentWeight,
            @RequestParam(value = "goalWeight", defaultValue="1", required = true) Integer goalWeight,
            @RequestParam(value = "calories", defaultValue = "1") Integer calories,
            @RequestParam(value = "carbohydrates", defaultValue = "1") Integer carbs,
            @RequestParam(value = "protein", defaultValue = "1") Integer protein,
            @RequestParam(value = "fat", defaultValue = "1") Integer fat
    ) {
        return new Goal(counter.incrementAndGet(), endGoal, currentWeight, goalWeight, calories, carbs, protein, fat);
    }
}
