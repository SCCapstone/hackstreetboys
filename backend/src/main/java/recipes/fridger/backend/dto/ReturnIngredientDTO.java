package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
@Data
public class ReturnIngredientDTO {
    private Long id;

    private String name;

    private Integer calories;

    private Integer carbohydrates;

    private Integer protein;

    private Integer fat;

    private Boolean alcohol;

    private Double cost;

    private String imgSrc;
}