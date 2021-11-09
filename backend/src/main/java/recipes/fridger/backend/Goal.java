package recipes.fridger.backend;

public class Goal {
    private final long user_id;
    private final String type;
    private final int carbohydrates;
    private final int protein;
    private final int fat;
    private final double current_weight_lb;
    private final double final_weight_lb;

    public Goal(long user_id, String type, int carbohydrates, int protein, int fat, double current_weight_lb, double final_weight_lb) {
        this.user_id = user_id;
        this.type = type;
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