package recipes.fridger.backend.stale;

public class Goal {
    private long user_id;
    private String endGoal;
    private int calories;
    private int carbohydrates;
    private int protein;
    private int fat;
    private double currentWeight;
    private double goalWeight;

    public Goal(long user_id, String endGoal, int calories, int carbohydrates, int protein, int fat, double currentWeight, double goalWeight) {
        this.user_id = user_id;
        this.endGoal = endGoal;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fat = fat;
        this.currentWeight = currentWeight;
        this.goalWeight = goalWeight;
    }

    // UserID
    public long getUserId() {
        return user_id;
    }
    public void setUserId(long new_user_id) {
        user_id = new_user_id;
    }

    // Type
    public String getEndGoal() {
        return endGoal;
    }
    public void setEndGoal(String new_endGoal) {
        endGoal = new_endGoal;
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
        return currentWeight;
    }
    public void setCurrentWeight(double new_currentWeight) { currentWeight = new_currentWeight;
    }

    // Final Weight (Pounds)
    public double getGoalWeight() {
        return goalWeight;
    }
    public void setGoalWeight(double new_goalWeight) { goalWeight = new_goalWeight;
    }
    

}