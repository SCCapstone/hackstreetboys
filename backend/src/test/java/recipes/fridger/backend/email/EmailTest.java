package recipes.fridger.backend.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import recipes.fridger.backend.mail.EmailService;

@SpringBootTest
@AutoConfigureMockMvc
public class EmailTest {

    @MockBean
    EmailService emailService;

    @Autowired
    ObjectMapper mapper;

    @Test
    public void emailServiceContextLoads() {
        Assertions.assertThat(emailService).isNotNull();
    }

    @Test
    public void simpleEmailTest() {

        String sendTo = "andrew.bernhardt@fridger.recipes";

        emailService.sendSimpleEmail(sendTo, "THIS IS A Fridger email test","this is sent from a test file in spring boot\nTest: simpleEmailTest");
    }
}
