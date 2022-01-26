package recipes.fridger.backend.dto;


import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import javax.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.model.User;

@Data
@NotNull
public class CreatePantryDTO {

    @Size(min=0,max=10000)
    private Long userID;

    @Size(min=0,max=10000)
    private String ingredientID;

    @Size(min=0,max=10000)
    private Float numIngredient;

    @Size(min=0, max=50)
    private String description;
}