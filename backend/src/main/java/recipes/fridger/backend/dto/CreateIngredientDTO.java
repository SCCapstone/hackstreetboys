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

    @Size(min = 0, max = 255)
    private String name;

    @Min(0)
    @Max(10000)
    private Integer calories;

    @Min(0)
    @Max(1000)
    private Integer carbohydrates;

    @Min(0)
    @Max(1000)
    private Integer protein;

    @Min(0)
    @Max(1000)
    private Integer fat;

    @NotNull
    private Boolean alcohol;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "10000.0")
    private Double cost;

    @Size(min = 0, max = 1000)
    private String imgSrc;
}