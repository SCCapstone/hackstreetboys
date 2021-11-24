package recipes.fridger.backend.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReturnUserDTO {
    
    private Long id;

    private String type;

    private String email;

    private String password;

    private String name;

    private String bio;

    private Date dob;

    private Integer height_in;

    private Double weight_lb;
}
