package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import recipes.fridger.backend.crud.Roles;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.crud.VerificationTokenRepository;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.mail.UserAlreadyExistException;
import recipes.fridger.backend.model.Role;
import recipes.fridger.backend.model.RoleEnum;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;

import javax.transaction.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private Users users;

    @Autowired
    private Roles roles;

    @Autowired
    VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private PasswordResetTokenRepository passwordTokenRepository;

    @Override
    public void createUser(CreateUserDTO dto) {

        User u = new User();
        u.setEmail(dto.getEmail());
        //u.setEnabled(false); //make the account not true until user registers with email
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
    @Override
    public User registerNewUserAccount(CreateUserDTO dto) {
        if (emailExists(dto.getEmail())) {
            throw new UserAlreadyExistException("There is an account with this email address: " + dto.getEmail());
        }
        User u = new User();
        u.setEnabled(false);
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
        return users.save(u);
    }
    public void saveRegisteredUser(User user) {
        users.save(user);
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

//    public UserDetails loadUserByUsername(String email)
//            throws UsernameNotFoundException {
//
//        boolean enabled = true;
//        boolean accountNonExpired = true;
//        boolean credentialsNonExpired = true;
//        boolean accountNonLocked = true;
//        try {
//            User user = users.findByEmailAuth(email);
//            if (user == null) {
//                throw new UsernameNotFoundException(
//                        "No user found with username: " + email);
//            }
//
//            return new org.springframework.security.core.userdetails.User(
//                    user.getEmail(),
//                    user.getPassword().toLowerCase(),
//                    user.isEnabled(),
//                    accountNonExpired,
//                    credentialsNonExpired,
//                    accountNonLocked,
//                    getAuthorities(user.getRole()));
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }


    private boolean emailExists(final String email) {
        return users.findByEmail(email) != null;
    }

    @Override
    public void createVerificationToken(User user, String token) {
        final VerificationToken myToken = new VerificationToken(user,token);
        tokenRepository.save(myToken);
    }

    public VerificationToken getVerificationToken(String token) {
        return tokenRepository.findByToken(token);
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
