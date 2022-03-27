package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.UpdateUserDTO;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

public interface UserService {
    public void createUser(CreateUserDTO dto);
    public void deleteUser(Long id);
    public User getUser(Long id);
    public void updateUser(Long id, UpdateUserDTO u) throws Exception;
    public boolean emailExistsPub(String email);
    public Iterable<User> getUsersByIdAndEmail(Long id, String email);
    public Iterable<User> getUsers(Long userId);
    public void testSendEmail(CreateUserDTO dto);
    public void sendVerificationEmail(User user, String url) throws MessagingException, UnsupportedEncodingException;
    public boolean verify(String verificationCode);
    public void deleteUserByEmail(String email);
    public User getUserByEmail(String email);
    public void saveRegisteredUser(User user);
    public void createVerificationToken(User user, String token);
    VerificationToken getVerificationToken(String token);
    public User registerNewUserAccount(CreateUserDTO dto, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException;
}
