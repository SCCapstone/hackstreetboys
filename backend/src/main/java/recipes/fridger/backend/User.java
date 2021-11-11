package recipes.fridger.backend;

// org.springframework.security.crypto.bcrypt
// GET SOME BCRYPT ACTION IN HERE

public class User {
    private long      id;
    private String    type;
    private String    email;
    private String    password;
    private String    name;
    private String    bio;
    private Date      dob;
    private int       height_in;
    private double    weight_lb;

    public User(long id, String type,  String email,  String password, String name, Date dob, int height_in, double weight_lb) {
        this.id = id;
        this.type = type;
        this.email = email;
        this.password = password;
        this.name = name;
        this.bio = ""; // Set bio to empty string by default, users can add to it later but likely not at account creation
        this.dob = dob;
        this.height_in = height_in;
        this.weight_lb = weight_lb;
    }

    // UserID
    public long getId() {
        return id;
    }
    public void setId(long new_id) {
        id = new_id;
    }

    // Type
    public String getType() {
        return type;
    }
    public void setType(String new_type) {
        type = new_type;
    }
    
    // Email
    public String getEmail() {
        return email;
    }
    public void setEmail(String new_email) {
        email = new_email;
    }

    // Password
    public String getPassword() {
        return password;
    }
    public void setPassword(String new_password) {
        password = new_password;
    }

    // Name
    public String getName() {
        return name;
    }
    public void setName(String new_name) {
        name = new_name;
    }

    // Bio
    public String getBio() {
        return bio;
    }
    public void setBio(String new_bio) {
        bio = new_bio;
    }

    // DOB
    public Date getDob() {
        return dob;
    }
    public void setDob(Date new_dob) {
        dob = new_dob;
    }

    // Height (Inches)
    public int getHeight() {
        return height_in;
    }
    public void setHeight(int new_height_in) {
        height_in = new_height_in;
    }

    // Weight (Pounds)
    public double getWeight() {
        return weight_lb;
    }
    public void setWeight(double new_weight_lb) {
        weight_lb = new_weight_lb;
    }
}