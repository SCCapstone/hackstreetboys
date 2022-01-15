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

    @Column(name = "userID", nullable = false)
    private Long userID;

    @Column(name = "ingredients_in_pantry", nullable = true)
    private String ingredientID;

    @Column(name = "number_of_ingredients", nullable = true)
    private Float numIngredient;

    //description of pantry (home, office, kitchen, grandmas, etc.)
    @Column(name = "description", nullable = true)
    private String description;

}