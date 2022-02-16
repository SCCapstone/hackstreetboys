package recipes.fridger.backend.dto;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.*;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.model.User;

@Data
@NotNull
public class CreatePantryDTO {

    @Min(0)
    @Max(10000000)
    private Long userID;

    @Size(min = 0,max = 10000)
    private String ingredientID;

    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "10000", inclusive = true) //inclusive = true is default
    private BigDecimal numIngredient;

    @Size(min = 0, max = 100)
    private String description;
}