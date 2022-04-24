package recipes.fridger.backend.model;


import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
//import javax.validation.constraints.DecimalMin;
//import javax.validation.constraints.Max;
import javax.validation.constraints.*;

import lombok.Data;

@Data
@Entity // This tells Hibernate to make a table out of this class
@Table(name = "ingredients")
public class Ingredient {
    // ingredient id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ingredient name
    @Size(min = 0, max = 255)
    @Column(name = "name", nullable = false)
    private String name;

    // ingredient calories
    @Min(0)
    @Max(10000)
    @Column(name = "calories", nullable = false)
    private Integer calories;

    // ingredient carbohydrates
    @Min(0)
    @Max(1000)
    @Column(name = "carbohydrates", nullable = false)
    private Integer carbohydrates;

    // ingredient protein
    @Min(0)
    @Max(1000)
    @Column(name = "protein", nullable = false)
    private Integer protein;

    // ingredient fat
    @Min(0)
    @Max(1000)
    @Column(name = "fat", nullable = false)
    private Integer fat;

    // ingredient alcohol
    @NotNull
    @Column(name = "alcohol", nullable = false)
    private Boolean alcohol;

    // ingredient cost
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10000.0")
    @Column(name = "cost", nullable = true)
    private Double cost;

    // ingredient image link
    @Size(min = 0)
    @Column(name = "imgSrc", nullable = false)
    private String imgSrc;
}
