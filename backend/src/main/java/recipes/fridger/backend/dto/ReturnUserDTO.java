package recipes.fridger.backend.dto;

import java.util.Date;

import lombok.Data;
import recipes.fridger.backend.model.User;

@Data
public class ReturnUserDTO {
    
    private Long id;

    private String email;

    private String name;

    private String bio;

    private Date dob;

    private Integer height_in;

    private Double weight_lb;

    public void convertFromUser(User user) {
        id = user.getId();
        email = user.getEmail();
        name = user.getName();
        bio = user.getBio();
        dob = user.getDob();
        height_in = user.getHeight_in();
        weight_lb = user.getWeight_lb();
    }
}
