package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import recipes.fridger.backend.crud.Roles;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.dto.UpdateUserDTO;
import recipes.fridger.backend.model.Role;
import recipes.fridger.backend.model.RoleEnum;
import recipes.fridger.backend.model.User;

import javax.transaction.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private Users users;
    
    @Autowired
    private Roles roles;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void createUser(CreateUserDTO dto) {
        User u = new User();
        u.setEmail(dto.getEmail());
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setName(dto.getName());
        u.setDob(dto.getDob());
        u.setHeight_in(dto.getHeight_in());
        u.setWeight_lb(dto.getWeight_lb());

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(roles.findByName(RoleEnum.ROLE_USER).orElseThrow(
            () -> new RuntimeException("Role not found")
        ));
        u.setRoles(userRoles);

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
    public void updateUser(Long id, UpdateUserDTO dto) throws Exception {
        Optional<User> optionalUser = users.findById(dto.getId().longValue());
        if(optionalUser.isPresent()) {
            User u = optionalUser.get();

            if (dto.getName() != null)
                u.setName(dto.getName());
            if (dto.getBio() != null)
                u.setBio(dto.getBio());
            if (dto.getDob() != null)
                u.setDob(dto.getDob());
            if (dto.getHeight_in() != null)
                u.setHeight_in(dto.getHeight_in());
            if (dto.getWeight_lb() != null)
                u.setWeight_lb(dto.getWeight_lb());
                
            users.save(u);
        }
    }

    @Transactional
    @Override
    public Iterable<User> getUsersByIdAndEmail(Long id, String email) {
        return users.findByIdAndEmail(id, email);
    }

    @Transactional
    public Iterable<User> getUsers(Long userId) {
        return users.find(userId);
    }


    @Transactional
    @Override
    public User getUserByEmail(String email) {
        return users.findByEmail(email).orElse(null);
    }

}
