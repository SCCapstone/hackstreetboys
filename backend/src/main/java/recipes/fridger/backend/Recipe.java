package recipes.fridger.backend;

import java.util.List;

public class Recipe {
    private final long recipeId;
    private final String title;
    private final String author;
    private final String description;
    private final Integer totalTime;
    private final Integer prepTime;
    private final Integer cookTime;
    private final Integer yield;
    private final List<Ingredient> ingredients;
    private final float estimatedCost;
    private final String type;
    private final boolean alcoholic;
    private final String[] tags;
    private final float rating;

    public Recipe(long recipeId, String title, String author, String description, Integer totalTime, Integer prepTime, Integer cookTime, Integer yield, List<Ingredient> ingredients, float estimatedCost, String type, boolean alcoholic, String[] tags, float rating) {
        this.recipeId = recipeId;
        this.title = title;
        this.author = author;
        this.description = description;
        this.totalTime = totalTime;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.yield = yield;
        this.ingredients = ingredients;
        this.estimatedCost = estimatedCost;
        this.type = type;
        this.alcoholic = alcoholic;
        this.tags = tags;
        this.rating = rating;
    }

    public long getRecipeId() {
        return recipeId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Integer getTotalTime() {
        return totalTime;
    }

    public Integer getPrepTime() {
        return prepTime;
    }

    public Integer getCookTime() {
        return cookTime;
    }

    public Integer getYield() {
        return yield;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public float getEstimatedCost() {
        return estimatedCost;
    }

    public String getType() {
        return type;
    }

    public boolean isAlcoholic() {
        return alcoholic;
    }

    public String[] getTags() {
        return tags;
    }
}

