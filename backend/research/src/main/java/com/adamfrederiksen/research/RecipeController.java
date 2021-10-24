package com.adamfrederiksen.research;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/recipes")
    public Recipe recipeBuilder(
            @RequestParam(value = "name", defaultValue = "Biscuits") String name,
            @RequestParam(value = "rating", required = true, defaultValue = "1") Integer rating,
            @RequestParam(value = "description", defaultValue = "Boohoo") String description,
            @RequestParam(value = "time", required = true, defaultValue = "1") Integer time
            ) {
        return new Recipe(counter.incrementAndGet(), name, rating, description, time);
    }
}
