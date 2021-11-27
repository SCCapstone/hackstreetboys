package recipes.fridger.backend.crud;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.User;

public interface Users extends CrudRepository<User, String> {
    @Query("select u from User u where (:email is null or u.email = :email)")
    List<User> find(String email);
}
