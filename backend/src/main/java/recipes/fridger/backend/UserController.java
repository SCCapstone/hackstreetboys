package recipes.fridger.backend;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/user")
    public User userBulder(
        @RequestParam(value = "type") String type,
        @RequestParam(value = "email") String email,
        @RequestParam(value = "password") String password,
        @RequestParam(value = "name") String name,
        @RequestParam(value = "dob") Date dob,
        @RequestParam(value = "height_in") int height_in,
        @RequestParam(value = "weight_lb") double weight_lb
    ) {
        return new User(counter.incrementAndGet(), type, email, password, name, dob, height_in, weight_lb);
    }
}
