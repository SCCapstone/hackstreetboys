package recipes.fridger.backend;

public class Ingredient {
    private final String name;
    private final int carbohydrates;
    private final int protein;
    private final int fat;
    private final boolean alcohol;
    private final double cost;

    public Ingredient(String name, int carbohydrates, int protein, int fat, boolean alcohol) {
        this.name = name;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fat = fat;
        this.alcohol = alcohol;
        this.cost = 0.0; // Find prices on Walmart's website?
    }

    // Name
    public String getName() {
        return name;
    }
    public void setName(String new_name) {
        name = new_name;
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
    public boolean getAlcohol() {
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