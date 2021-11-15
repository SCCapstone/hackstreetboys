package recipes.fridger.backend.model;


import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity // This tells Hibernate to make a table out of this class
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(0)
    @Column(name = "author_id")
    private Long authorID;

    @Min(0)
    @Column(name = "recipe_id")
    private Long recipeID;

    @Max(5)
    @Min(0)
    @Column(name = "rating", nullable = true)
    private Integer rating;

    @Size(min = 0, max = 255)
    @Column(name = "feedback", nullable = true)
    private String feedback;

}
