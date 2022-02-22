package recipes.fridger.backend.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImp implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    private final String fridgerEmail = "noreply@fridger.recipes.com";

    private final String verificationSubject = "Verify Your Account with Fridger";
    private final String verificationBody = "Welcome to fridger! we are excited to begin your journey with you!" +
            "\n";

    @Override
    public void sendSimpleEmail(String sendTo,
                                String subject,
                                String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fridgerEmail);
        message.setTo(sendTo);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);

        log.info("mail sent i think");
    }

    @Override
    public void sendUserVerification(String sendTo,String subject,String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fridgerEmail);
        message.setTo(sendTo);
        message.setSubject(verificationSubject);
        message.setText(verificationBody);

    }
    @Override
    public void sendUserForgotPassword(String to,String subject,String ...templateModel) {

    }
    public void sendMessageWithAttachment(String to,String subject,String text,String pathToAttachment) {

    }
}
