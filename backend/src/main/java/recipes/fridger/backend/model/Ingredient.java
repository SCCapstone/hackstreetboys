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
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 0, max = 255)
    @Column(name = "name", nullable = true)
    private String name;

    @Min(0)
    @Column(name = "calories")
    private Integer calories;

    @Min(0)
    @Column(name = "carbohydrates")
    private Integer carbohydrates;

    @Min(0)
    @Column(name = "protein")
    private Integer protein;

    @Min(0)
    @Column(name = "fat")
    private Integer fat;

    @Column(name = "alcohol")
    private Boolean alcohol;

    @DecimalMin(value = "0.0")
    @Column(name = "cost")
    private Double cost;
}
