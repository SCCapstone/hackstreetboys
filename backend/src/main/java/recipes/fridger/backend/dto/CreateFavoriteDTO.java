package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateFavoriteDTO {
    //creates a favorite

    @NotNull
    private Long userId;

    @NotNull
    private Long recipeId;
}