package main.java.pantry.fridger.backend.model;

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

}