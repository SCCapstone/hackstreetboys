package recipes.fridger.backend;

public class Goal {
    private long user_id;
    private String endGoal;
    private int currentWeight;
    private int goalWeight;
    private int calories;
    private int carbohydrates;
    private int protein;
    private int fat;

    public Goal(long user_id, String endGoal, int currentWeight, int goalWeight, int calories, int carbohydrates, int protein, int fat) {
        this.user_id = user_id;
        this.endGoal = endGoal;
        this.currentWeight = currentWeight;
        this.goalWeight = goalWeight;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
        this.fat = fat;
    }

    // UserID
    public long getUserId() {
        return user_id;
    }
    public void setUserId(long new_user_id) {
        user_id = new_user_id;
    }

    // EndGoal
    public String getEndGoal() {
        return endGoal;
    }
    public void setEndGoal(String new_endGoal) {
        endGoal = new_endGoal;
    }

    //CurrentWeight
    public int getCurrentaWeight() {
        return currentWeight;
    }
    public void setCurrentWeight(int new_currentWeight) {
        currentWeight = new_currentWeight;
    }

    //GoalWeight
    public int getGoalWeight() {
        return goalWeight;
    }
    public void setGoalWeight(int new_goalWeight) {
        goalWeight = new_goalWeight;
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


    

}