package recipes.fridger.backend.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "id", unique = true)
     private Long id;

     @ManyToMany(fetch = FetchType.LAZY)
	 @JoinTable(	name = "user_roles",
           joinColumns = @JoinColumn(name = "user_id"),
           inverseJoinColumns = @JoinColumn(name = "role_id"))
	 private Set<Role> roles = new HashSet<>();

     @Size(min = 0, max = 100)
     @Column(name = "email", unique = true)
     private String email;

     @Column(name = "enabled")
     private boolean enabled;

     @Column(name = "verification_code", length = 64)
     private String verificationCode;

     @Size(min = 0, max = 100)
     @Column(name = "password")
     private String password;

     @Size(min = 0, max = 100)
     @Column(name = "name")
     private String name;

     @Size(min = 0, max = 1000)
     @Column(name = "bio")
     private String bio;

     @Column(name = "dob")
     private Date dob;

     @Min(0)
     @Column(name = "height_in")
     private Integer height_in;

     @DecimalMin(value = "0")
     @Column(name = "weight_lb")
     private Double weight_lb;

//     @Column(name = "favorites", nullable = false)
//     private String favorites;
}
