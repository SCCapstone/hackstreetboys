package recipes.fridger.backend.crud;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.User;

public interface Users extends CrudRepository<User, Long> {
    @Query("select u from User u where (:id is null or u.id = :id)")
    List<User> find(Long id);
}
