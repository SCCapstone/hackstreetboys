package recipes.fridger.backend.dto;

import lombok.Data;

import java.util.Date;

import javax.validation.constraints.*;

@Data
@NotNull
public class UpdateUserDTO {
    private Long id;

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
}
