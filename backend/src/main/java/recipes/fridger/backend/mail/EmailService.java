package recipes.fridger.backend.mail;

public interface EmailService {
    public void sendSimpleEmail(String to,String subject,String text);
    public void sendUserVerification(String to);
    public void sendUserForgotPassword(String to,String subject,String ...templateModel);
    public void sendMessageWithAttachment(String to,String subject,String text,String pathToAttachment);
}
