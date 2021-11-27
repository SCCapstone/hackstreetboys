package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;

public interface UserService {
    public void createUser(CreateUserDTO dto);
    public void deleteUser(String email);
    public User getUser(String email);
    public Iterable<User> getUsers(String email);
}
