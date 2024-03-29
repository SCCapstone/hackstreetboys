package recipes.fridger.backend.crud;

import java.util.Optional;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.User;

public interface Users extends CrudRepository<User, Long> {
    @Query("select u from User u where (:id is null or u.id = :id)")
    List<User> find(Long id);

    @Query("select u from User u where (:id is null or u.id = :id) and (:email is null or u.email = :email)")
    List<User> findByIdAndEmail(Long id, String email);

    @Query("select u from User u where (u.email = :email)")
    Optional<User> findByEmail(String email);

    @Query("select u from User u where (u.email = :email)")
    User findByEmailAuth(String email);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    public User findByVerificationCode(String code);

}
