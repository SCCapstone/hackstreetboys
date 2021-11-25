package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
@Data
public class ReturnRecipeDTO {
    private Integer id;

    private String title;

    private String author;

    private String description;

    private Integer totalTime;

    private Integer prepTime;

    private Integer cookTime;

    private Integer yield;

    private Double estimatedCost;

    private String type;

    private Boolean alcoholic;

    private String[] tags;

    private Integer rating;
}
