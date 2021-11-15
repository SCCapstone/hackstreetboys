package recipes.fridger.backend.model;


import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity // This tells Hibernate to make a table out of this class
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(min = 0, max = 255)
    @Column(name = "title", nullable = true)
    private String title;

    @Size(min = 0, max = 100)
    @Column(name = "author", nullable = true)
    private String author;

    @Size(min = 0, max = 500)
    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "total_time")
    private Integer totalTime;

    @Column(name = "prep_time")
    private Integer prepTime;

    @Column(name = "cook_time")
    private Integer cookTime;

    @Column(name = "yield")
    private Integer yield;

    @DecimalMin(value = "0")
    @Column(name = "estimated_cost")
    private Double estimatedCost;

    @Size(min = 0, max = 50)
    @Column(name = "type", nullable = true)
    private String type;

    @Column(name = "alcoholic")
    private Boolean alcoholic;

    @Column(name = "tags", nullable = true)
    private String[] tags;

    @Min(0)
    @Max(5)
    @Column(name = "rating", nullable = true)
    private Integer rating;
}