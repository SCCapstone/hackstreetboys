package recipes.fridger.backend.dto;

import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateGoalDTO {

    @Size(min = 0, max = 255)
    private String endGoal;

    @DecimalMin(value = "0")
    private Integer calories;

    @DecimalMin(value = "0")
    private Integer carbohydrates;

    @DecimalMin(value = "0")
    private Integer protein;

    @DecimalMin(value = "0")
    private Integer fat;

    @DecimalMin(value = "0")
    private Double currentWeight;

    @DecimalMin(value = "0")
    private Double goalWeight;

    private Long userId;
}
