package recipes.fridger.backend;

public class Goal {
    private long user_id;
    private String type;
    private int calories;
    private int carbohydrates;
    private int protein;
    private int fat;
    private double current_weight_lb;
    private double final_weight_lb;

    public Goal(long user_id, String type, int calories, int carbohydrates, int protein, int fat, double current_weight_lb, double final_weight_lb) {
        this.user_id = user_id;
        this.type = type;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fat = fat;
        this.current_weight_lb = current_weight_lb;
        this.final_weight_lb = final_weight_lb;
    }

    // UserID
    public long getUserId() {
        return user_id;
    }
    public void setUserId(long new_user_id) {
        user_id = new_user_id;
    }

    // Type
    public String getType() {
        return type;
    }
    public void setType(String new_type) {
        type = new_type;
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

    // Current Weight (Pounds)
    public double getCurrentWeight() {
        return current_weight_lb;
    }
    public void setCurrentWeight(double new_current_weight_lb) {
        current_weight_lb = new_current_weight_lb;
    }

    // Final Weight (Pounds)
    public double getFinalWeight() {
        return final_weight_lb;
    }
    public void setFinalWeight(double new_final_weight_lb) {
        final_weight_lb = new_final_weight_lb;
    }
    

}