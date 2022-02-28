package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.*;
@Data
public class ReturnGoalDTO {

    private Long id;

    private String endGoal;

    private Integer calories;

    private Integer carbohydrates;

    private Integer protein;

    private Integer fat;

    private Double currentWeight;

    private Double goalWeight;

    private Long userId;
}
