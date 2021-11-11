package recipes.fridger.backend;

import java.util.List;

public class Pantry {
    private String user_id;
    private List<Ingredient> inventory;

    public Pantry(String user_id, List<Ingredient> inventory) {
        this.user_id = user_id;
        this.inventory = inventory;
    }

    // UserID
    public long getUserId() {
        return Long.parseLong(user_id);
    }
    public void setUserId(String new_user_id) {
        user_id = new_user_id;
    }

    // Inventory
    public List<Ingredient> getInventory() {
        return inventory;
    }
    public void setInventory(List<Ingredient> new_inventory) {
        inventory = new_inventory;
    }
    public void addToInventory(Ingredient new_item) {
        inventory.add(new_item);
    }


}