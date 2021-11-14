package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateIngredientDTO {

    @Size(min = 0, max = 255)
    private String name;

    @Min(0)
    private Integer calories;

    @Min(0)
    private Integer carbohydrates;

    @Min(0)
    private Integer protein;

    @Min(0)
    private Integer fat;

    private Boolean alcohol;

    @DecimalMin(value = "0.0")
    private Double cost;
}
