package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.*;
@Data
public class ReturnFavoriteDTO {
    //returns favorite format

    private Long id;

    private Long userId;

    private Long recipeId;
}