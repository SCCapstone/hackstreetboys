package pantry.fridger.backend.model;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "pantry")
public class Pantry {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //this pantry corresponds to this user
    @Column(name = "owner", nullable = false)
    private User owner;

    //this pantry contains all of these ingredients
    @Column(name = "pantry", nullable = true)
    private ArrayList<Ingredients> pantry;

    //description of pantry (home, office, kitchen, grandmas, etc.)
    @Column(name = "description", nullable = true)
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public ArrayList<Ingredients> getPantry() {
        return pantry;
    }

    public void setPantry(ArrayList<Ingredients> pantry) {
        this.pantry = pantry;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}