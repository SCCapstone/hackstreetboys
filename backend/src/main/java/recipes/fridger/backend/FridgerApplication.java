package recipes.fridger.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import recipes.fridger.backend.mail.EmailService;

@Slf4j
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class FridgerApplication {
	@Autowired
	private EmailService emailService;

	public static void main(String[] args) {
		SpringApplication.run(FridgerApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void sendMail() {
		emailService.sendSimpleEmail("andrew.bernhardt@fridger.recipes","Hello! This is a test for fridger!","do ya thing dog");
		log.info("sent test hopefully");
	}

}
