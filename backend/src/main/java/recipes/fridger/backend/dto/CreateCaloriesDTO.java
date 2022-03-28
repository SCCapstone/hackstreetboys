package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateCaloriesDTO {

    @NotNull
    private Long userId;

    @NotNull
    private String title;

    @NotNull
    private Long calorieCount;
}
