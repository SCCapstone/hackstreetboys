package recipes.fridger.backend.dto;

import java.util.Date;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;

import lombok.Data;

@Data
@NotNull
public class CreateUserDTO {

    @Size(min = 0, max = 100)
    private String email;

    @Size(min = 0, max = 100)
    private String password;

    @Size(min = 0, max = 100)
    private String name;

    @Size(min = 0, max = 1000)
    private String bio;

    private Date dob;

    @Min(0)
    private Integer height_in;

    @DecimalMin(value = "0")
    private Double weight_lb;

//    @Size(min = 0, max = 255)
//    private String favorites;
}
