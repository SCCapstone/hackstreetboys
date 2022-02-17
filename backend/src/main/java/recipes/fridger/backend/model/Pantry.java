package recipes.fridger.backend.model;

import java.math.BigDecimal;
import java.util.Hashtable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.Data;
/*
    This table "pantry" will hold all of the ingredients associated with people's pantries.
 */
@Data
@Entity
@Table(name = "pantry")
public class Pantry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(0)
    @Max(10000000)
    @Column(name = "userID", nullable = false)
    private Long userID;

    @Size(min = 0, max = 100000)
    @Column(name = "ingredient_id", nullable = true)
    private String ingredientID;

    @DecimalMin(value= "0.0", inclusive = true)
    @DecimalMax(value= "10000.0") //inclusive = true is default
    @Column(name = "num_of_ingredient", nullable = true)
    private Double numIngredient;

    //description of pantry (home, office, kitchen, grandmas, etc.)
    @Size(min = 0, max = 100)
    @Column(name = "description", nullable = true)
    private String description;

}