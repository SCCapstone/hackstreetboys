package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Data;
@Data
@NotNull
public class CreateIngredientDTO {

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
    @Size(min = 0)
    private String imgSrc;
}