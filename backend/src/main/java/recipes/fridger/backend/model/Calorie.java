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
import java.util.Date;


import lombok.Data;

@Data
@Entity
@Table(name = "calories")
public class Calorie {
    //fields for calories with the id being automatically generated.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "calorieCount", nullable = false)
    private Long calorieCount;

    @Column(name = "dateAdded", nullable = false)
    private Date dateAdded;
}


