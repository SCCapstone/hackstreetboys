package recipes.fridger.backend.dto;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateRecipeDTO {

    @Size(min = 0, max = 255)
    private String title;

    @Size(min = 0, max = 100)
    private String author;

    @Size(min = 0, max = 500)
    private String description;

    private Integer prepTime;

    private Integer cookTime;

    private Integer yield;

    private List<Long> ingredientIds;

    @DecimalMin(value = "0")
    private Double estimatedCost;

    @Size(min = 0, max = 50)
    private String type;

    private Boolean alcoholic;

    private List<String> tags;
}
