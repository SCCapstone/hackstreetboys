package recipes.fridger.backend.model;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;
import recipes.fridger.backend.model.User;
import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "pantry")
public class Pantry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //this pantry corresponds to this user
    @Column(name = "owner", nullable = false)
    private String ownerId;

    //this pantry contains all of these ingredients
    @Column(name = "pantry", nullable = true)
    @OneToMany
    private ArrayList<Ingredient> pantry;

    //description of pantry (home, office, kitchen, grandmas, etc.)
    @Column(name = "description", nullable = true)
    private String description;

    public ArrayList<Ingredient> getPantry() {
        return pantry;
    }

    public void setPantry(ArrayList<Ingredient> pantry) {
        this.pantry = pantry;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}