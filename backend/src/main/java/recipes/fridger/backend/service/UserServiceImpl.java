package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.model.User;

import javax.transaction.Transactional;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private Users users;

    @Override
    public void createUser(CreateUserDTO dto) {
        User u = new User();
        u.setType(dto.getType());
        u.setEmail(dto.getEmail());
        u.setPassword(dto.getPassword());
        u.setName(dto.getName());
        u.setDob(dto.getDob());
        u.setHeight_in(dto.getHeight_in());
        u.setWeight_lb(dto.getWeight_lb());
        users.save(u);
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        Optional<User> user = users.findById(email);
        if (user.isPresent()) {
            User u = user.get();
            users.delete(u);
        }
    }

    @Transactional
    @Override
    public User getUser(String email) {
        Optional<User> user = users.findById(email);
        return user.isPresent() ? user.get() : null;
    }

    @Transactional
    public Iterable<User> getUsers(String email) {
        return users.find(email);
    }
}
