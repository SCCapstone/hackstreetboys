package recipes.fridger.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import recipes.fridger.backend.crud.Roles;
import recipes.fridger.backend.crud.Users;
import recipes.fridger.backend.crud.VerificationTokenRepository;
import recipes.fridger.backend.dto.CreateUserDTO;
import recipes.fridger.backend.mail.UserAlreadyExistException;
import recipes.fridger.backend.dto.UpdateUserDTO;
import recipes.fridger.backend.model.Role;
import recipes.fridger.backend.model.RoleEnum;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;

import javax.transaction.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private Users users;

    @Autowired
    private Roles roles;

    @Autowired
    VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

//    @Autowired
//    private PasswordResetTokenRepository passwordTokenRepository;

    @Override
    public void createUser(CreateUserDTO dto) {

        User u = new User();
        u.setEmail(dto.getEmail());
        sendVerificationEmail(dto);

        //u.setEnabled(false); //make the account not true until user registers with email
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setName(dto.getName());
        u.setBio(dto.getBio());
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
    public void sendVerificationEmail(CreateUserDTO dto) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("noreplyfridger@gmail.com");
        email.setTo(dto.getEmail());
        email.setSubject("Welcome To Fridger!");
        email.setText("Dear" + dto.getName() + ",\n" +
                "We are excited to have you join our fridger community! Thank you " +
                "for signing up with us!");
        mailSender.send(email);
        log.info("Sending confirmation email to " + dto.getEmail());
    }

    //still under testing
    @Override
    public User registerNewUserAccount(CreateUserDTO dto) {
        if (emailExists(dto.getEmail())) {
            throw new UserAlreadyExistException("There is an account with this email address: " + dto.getEmail());
        }
        User u = new User();
        u.setEmail(dto.getEmail());
        u.setEnabled(false);
        u.setPassword(passwordEncoder.encode(dto.getPassword()));
        u.setName(dto.getName());
        u.setBio(dto.getBio());
        u.setDob(dto.getDob());
        u.setHeight_in(dto.getHeight_in());
        u.setWeight_lb(dto.getWeight_lb());

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(roles.findByName(RoleEnum.ROLE_USER).orElseThrow(
                () -> new RuntimeException("Role not found")
        ));
        u.setRoles(userRoles);
        log.info(dto.getEmail());
        log.info("RegisterNewAccountRAN!");
        return users.save(u);
    }
    //TODO
    private boolean emailExists(String email) {
        if(users.findByEmail(email)!=null)
            return true;
        return false;
    }

    public void saveRegisteredUser(User user) {
        users.save(user);
    }

    //TODO DONE?
    @Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(user,token);
        tokenRepository.save(myToken);
    }

    @Override
    public VerificationToken getVerificationToken(String token) {
        return tokenRepository.findByToken(token);
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


    @Transactional
    @Override
    public User getUserByEmail(String email) {
        return users.findByEmail(email).orElse(null);
    }

}
