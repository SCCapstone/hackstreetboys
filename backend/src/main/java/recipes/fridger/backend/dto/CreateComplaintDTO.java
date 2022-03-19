package recipes.fridger.backend.dto;
import java.util.Date;

import javax.validation.constraints.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Data;
@Data
@NotNull
public class CreateComplaintDTO {

    private Long authorId;
    private String authorName;
    private Long complaintId;

    @Min(0)
    @Max(5)
    private Integer severity;

    @Size(min = 0, max = 10000)
    private String reason;

}
