package recipes.fridger.backend.dto;

import lombok.Data;

import javax.validation.constraints.*;

// Changes Existing Ingredients
@Data
@NotNull
public class UpdateIngredientDTO {

    // ingredient id
    private Long id;

    // ingredient name
    @Size(min = 0, max = 255)
    private String name;

    // ingredient calories
    @Min(0)
    @Max(10000)
    private Integer calories;

    // ingredient carbohydrates
    @Min(0)
    @Max(1000)
    private Integer carbohydrates;

    // ingredient protein
    @Min(0)
    @Max(1000)
    private Integer protein;

    // ingredient fat
    @Min(0)
    @Max(1000)
    private Integer fat;

    // ingredient alcohol
    @NotNull
    private Boolean alcohol;

    // ingredient cost
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10000.0")
    private Double cost;

    // ingredient image link
    @Size(min = 0, max = 1000)
    private String imgSrc;
}