package recipes.fridger.backend.dto;

import java.math.BigDecimal;
import java.util.List;
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

    private Long userID;

    private String ingredientID;

    private Double numIngredient;

    private String description;

}
