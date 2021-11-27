package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
@Data
public class ReturnRecipeDTO {
    private Long id;

    private String title;

    private String author;

    private String description;

    private String body;

    private String imgSrc;

    private Integer totalTime;

    private Integer prepTime;

    private Integer cookTime;

    private Integer yield;

    private String ingredientIds;

    private Double estimatedCost;

    private String type;

    private Boolean alcoholic;

    private String tags;

    private Integer rating;
}
