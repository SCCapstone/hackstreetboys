package recipes.fridger.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reviewId", nullable = false)
    private Long reviewId;

    @Column(name = "reportBy")
    private Long reportBy;

    @Size(min = 0, max = 1000)
    @Column(name = "reportBody", nullable = false)
    private String reportBody;
    
    @Column(name = "active", nullable = false)
    private Boolean active;
}

