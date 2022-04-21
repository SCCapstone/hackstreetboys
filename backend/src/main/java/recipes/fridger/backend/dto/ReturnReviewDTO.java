package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
@Data
public class ReturnReviewDTO {
    //returns review format

    private Long id;

    private Long authorId;

    private String authorName;

    private Long recipeId;

    private Integer rating;

    private String feedback;
}