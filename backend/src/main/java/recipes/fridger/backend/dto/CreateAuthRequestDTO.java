package recipes.fridger.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NotNull
@NoArgsConstructor
@AllArgsConstructor
public class CreateAuthRequestDTO {

    @Size(min = 0, max = 100)
     private String email;

    @Size(min = 0, max = 100)
    private String password;
}