package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateReviewDTO {

    @Min(0)
    private Long authorId;

    @Min(0)
    private Long recipeId;

    @Max(5)
    @Min(0)
    private Integer rating;

    @Size(min = 0, max = 255)
    private String feedback;

}
