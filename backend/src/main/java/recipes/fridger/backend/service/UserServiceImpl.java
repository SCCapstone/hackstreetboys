package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(CreateUserDTO dto) {
        User u = new User();
        u.setType(dto.getType());
        // TODO ensure users can't create an account with email address already in use
        u.setEmail(dto.getEmail());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setName(dto.getName());
        u.setDob(dto.getDob());
        u.setHeight_in(dto.getHeight_in());
        u.setWeight_lb(dto.getWeight_lb());

        users.save(u);
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        Optional<User> user = users.findById(id);
        if (user.isPresent()) {
            User u = user.get();
            users.delete(u);
        }
    }

    @Transactional
    @Override
    public User getUser(Long id) {
        Optional<User> user = users.findById(id);
        return user.isPresent() ? user.get() : null;
    }

    @Transactional
    @Override
    public Iterable<User> getUsersByIdAndEmail(Long id, String email) {
        return users.findByIdAndEmail(id, email);
    }

    @Transactional
    @Override
    public User authenticateUser(String email, String password) {
        Optional<User> user = users.findByEmail(email);
        if (user.isPresent()) {
            User u = user.get();
            if (passwordEncoder.matches(password, u.getPassword()))
                return u;
        }
        return null;
    }

    @Transactional
    public Iterable<User> getUsers(Long userId) {
        return users.find(userId);
    }
}
