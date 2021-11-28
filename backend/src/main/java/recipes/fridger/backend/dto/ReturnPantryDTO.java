package recipes.fridger.backend.dto;

import java.util.ArrayList;
import recipes.fridger.backend.model.*;
import lombok.Data;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;

@Data
public class ReturnPantryDTO {
    private Long id;

    private User owner;

    private String pantry;

    private String description;

}