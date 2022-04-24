package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

// Getting Ingredients
@Data
public class ReturnIngredientDTO {

    // ingredient id
    private Long id;

    // ingredient name
    private String name;

    // ingredient calories
    private Integer calories;

    // ingredient carbohydrates
    private Integer carbohydrates;

    // ingredient protein
    private Integer protein;

    // ingredient fat
    private Integer fat;

    // ingredient alcohol
    private Boolean alcohol;

    // ingredient cost
    private Double cost;

    // ingredient image link
    private String imgSrc;
}