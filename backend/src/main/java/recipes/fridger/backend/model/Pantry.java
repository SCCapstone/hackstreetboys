package recipes.fridger.backend.model;

import java.util.Hashtable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pantry")
public class Pantry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ingredientsInPantry", nullable = true)
    private String ingredientID;

    @Column(name = "numberofIngredient", nullable = true)
    private String numIngredientID;

    //description of pantry (home, office, kitchen, grandmas, etc.)
    @Column(name = "description", nullable = true)
    private String description;

}