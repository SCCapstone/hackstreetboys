package recipes.fridger.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import recipes.fridger.backend.mail.EmailService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class FridgerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FridgerApplication.class, args);
	}

}
