package recipes.fridger.backend.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recipes.fridger.backend.model.User;
import recipes.fridger.backend.model.VerificationToken;

//@Repository
public interface VerificationTokenRepository
        extends JpaRepository<VerificationToken, Long> {

    @Query("select t from VerificationToken t where (:token = :token)")
    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);
}