package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;

public interface UserService {
    public void createUser(CreateUserDTO dto);
    public void deleteUser(Long id);
    public User getUser(Long id);
    public Iterable<User> getUsersByIdAndEmail(Long id, String email);
    public User authenticateUser(String email, String password);
    public Iterable<User> getUsers(Long userId);
    public User getUserByEmail(String email);
    public void saveRegisteredUser(User user);
    public void createVerificationToken(User user, String token);
    VerificationToken getVerificationToken(String token);
    public User registerNewUserAccount(CreateUserDTO dto);
}
