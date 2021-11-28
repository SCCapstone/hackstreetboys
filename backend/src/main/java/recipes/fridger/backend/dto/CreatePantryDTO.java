package recipes.fridger.backend.dto;


import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.model.User;

@Data
@NotNull
public class CreatePantryDTO {

    private String ownerId;

    //not sure about size here, but I assume we will hold a LOT of ingredients in the pantry
    //@Size(min=0,max=1024)
    private String pantry;

    //size of description
    //@size(min=0,max=512)
    private String description;

    public String getDescription() {
        return description;
    }

    public String getPantry() {
        return pantry;
    }

}