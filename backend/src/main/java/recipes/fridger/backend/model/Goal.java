package recipes.fridger.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 0, max = 100)
    @Column(name = "endGoal")
    private String endGoal;

    @Min(0)
    @Column(name = "calories")
    private Integer calories;

    @Min(0)
    @Column(name = "carbohydrates")
    private Integer carbohydrates;

    @Min(0)
    @Column(name = "protein")
    private Integer protein;

    @Min(0)
    @Column(name = "fat")
    private Integer fat;

    @DecimalMin(value = "0")
    @Column(name = "currentWeight")
    private Double currentWeight;

    @DecimalMin(value = "0")
    @Column(name = "goalWeight")
    private Double goalWeight;

    @Column(name = "userId", nullable = false)
    private Long userId;
}

