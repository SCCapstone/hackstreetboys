package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.*;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Data
@NotNull
//Creates a recipe
    public class CreateRecipeDTO {

    @Size(min = 0, max = 255)
    private String title;

    @Min(1)
    private long author;

    @Size(min = 0, max = 500)
    private String description;

    @Size(min = 0, max = 100000)
    private String body;

    @Size(min = 0)
    private String imgSrc;

    @Min(0)
    @Max(600)
    private Integer prepTime;

    @Min(0)
    @Max(600)
    private Integer cookTime;

    @Min(0)
    @Max(100)
    private Integer yield;

    @Size(min = 0, max = 255)
    private String ingredientIds;

    @DecimalMin(value = "0") @DecimalMax(value = "1000")
    private Double estimatedCost;

    @Size(min = 0, max = 50)
    private String type;

    @NotNull
    private Boolean alcoholic;

    @Size(min = 0, max = 50)
    private String tags;
}
