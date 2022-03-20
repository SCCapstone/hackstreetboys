package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.*;
@Data
public class ReturnComplaintDTO {
    private Long id;

    private Long authorId;

    private Long recipeId;

    private Integer severity;

    private String reason;
}