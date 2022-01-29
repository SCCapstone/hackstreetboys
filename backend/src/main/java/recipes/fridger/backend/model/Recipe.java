package recipes.fridger.backend.model;

import java.util.Date;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity // This tells Hibernate to make a table out of this class
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 0, max = 255)
    @Column(name = "title", nullable = true)
    private String title;

    @Size(min = 0, max = 100)
    @Column(name = "author", nullable = true)
    private String author;

    @Size(min = 0, max = 500)
    @Column(name = "description", nullable = true)
    private String description;

    @Size(min = 0, max = 500)
    @Column(name = "img_src", nullable = true)
    private String imgSrc;

    @Size(min = 0, max = 100000)
    @Column(name = "body", nullable = true)
    private String body;

    @Column(name = "total_time", nullable = false)
    private Integer totalTime;

    @Column(name = "prep_time", nullable = false)
    private Integer prepTime;

    @Column(name = "cook_time", nullable = false)
    private Integer cookTime;

    @Column(name = "yield", nullable = false)
    private Integer yield;

    @Column(name = "ingredient_ids", nullable = false)
    private String ingredientIds;

    @DecimalMin(value = "0")
    @Column(name = "estimated_cost", nullable = false)
    private Double estimatedCost;

    @Size(min = 0, max = 50)
    @Column(name = "type", nullable = true)
    private String type;

    @Column(name = "alcoholic", nullable = false)
    private Boolean alcoholic;

    @Column(name = "tags", nullable = false)
    private String tags;

    @DecimalMin(value = "0")
    @DecimalMax(value = "5")
    @Column(name = "rating", nullable = false)
    private Double rating;


    public String toString() {
        return "\nid: "             + id +
                "\ntitle: "         + title +
                "\nauthor: "        + author +
                "\ndescription: "   + description +
                "\ntotalTime: "     + totalTime +
                "\nprepTime: "      + prepTime +
                "\nprepTime: "      + cookTime +
                "\nyield: "         + yield +
                "\ningredientIds: " + ingredientIds +
                "\nestimatedCost: " + estimatedCost +
                "\ntype: "          + type +
                "\nalcoholic: "     + alcoholic +
                "\ntags: "          + tags +
                "\nrating: "        + rating + "\n";
    }
}
