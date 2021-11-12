package recipes.fridger.backend.stale;

public class Ingredient {
    private String name;
    private int calories;
    private int carbohydrates;
    private int protein;
    private int fat;
    private boolean alcohol;
    private double cost;

    public Ingredient(String name, int calories, int carbohydrates, int protein, int fat, boolean alcohol, double cost) {
        this.name = name;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fat = fat;
        this.alcohol = alcohol;
        this.cost = cost; // Find prices on Walmart's website?
    }

    // Name
    public String getName() {
        return name;
    }
    public void setName(String new_name) {
        name = new_name;
    }

    // Calories
    public int getCalories() {
        return calories;
    }
    public void setCalories(int new_calories) {
        calories = new_calories;
    }

    // Carbohydrates
    public int getCarbohydrates() {
        return carbohydrates;
    }
    public void setCarbohydrates(int new_carbohydrates) {
        carbohydrates = new_carbohydrates;
    }

    // Protein
    public int getProtein() {
        return protein;
    }
    public void setProtein(int new_protein) {
        protein = new_protein;
    }

    // Fat
    public int getFat() {
        return fat;
    }
    public void setFat(int new_fat) {
        fat = new_fat;
    }

    // Alcohol
    public boolean isAlcoholic() {
        return alcohol;
    }
    public void setAlcohol(boolean new_alcohol) {
        alcohol = new_alcohol;
    }

    // Cost
    // Find price of a food item from Walmart?
    // https://developer.walmart.com/doc/us/mp/us-mp-price/
    // https://developer.walmart.com/api/us/mp/price
    public double getCost() {
        return cost;
    }
    public void setCost(double new_cost) {
        cost = new_cost;
    }


}