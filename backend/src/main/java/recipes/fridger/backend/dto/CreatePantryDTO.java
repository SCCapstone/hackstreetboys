package recipes.fridger.backend.dto;


import java.util.ArrayList;

import javax.validation.constraints.NotNull;

import lombok.Data;
import recipes.fridger.backend.model.Ingredient;
import recipes.fridger.backend.model.User;

@Data
@NotNull
public class CreatePantryDTO {
    //@Size(length=32)
    private Integer id;

    //size wil be whatever the username constraints will be
    //@Size(min=3,max=20)
    private User owner;

    //not sure about size here, but I assume we will hold a LOT of ingredients in the pantry
    //@Size(min=0,max=1024)
    private ArrayList<Ingredient> pantry;

    //size of description
    //@size(min=0,max=512)
    private String description;
}