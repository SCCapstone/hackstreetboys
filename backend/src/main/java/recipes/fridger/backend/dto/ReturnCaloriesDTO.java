package recipes.fridger.backend.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.*;
import java.util.Date;

@Data
public class ReturnCaloriesDTO {

    private Long id;

    private Long userId;

    private String title;

    private Long calorieCount;

    private Date dateAdded;
}
