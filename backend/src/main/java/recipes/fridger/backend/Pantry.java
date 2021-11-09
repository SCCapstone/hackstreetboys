package recipes.fridger.backend;

import java.util.List;

public class Pantry {
    private final long user_id;
    private final List<Ingredient> inventory;

    public Pantry(long user_id, List<Ingredient> inventory) {
        this.user_id = user_id;
        this.inventory = inventory;
    }

    // UserID
    public long getUserId() {
        return user_id;
    }
    public void setUserId(String new_user_id) {
        user_id = new_user_id;
    }

    // Inventory
    public int getInventory() {
        return inventory;
    }
    public void setInventory(int new_inventory) {
        inventory = new_inventory;
    }
    public void addToInventory(Ingredient new_item) {
        inventory.add(new_item)
    }


}