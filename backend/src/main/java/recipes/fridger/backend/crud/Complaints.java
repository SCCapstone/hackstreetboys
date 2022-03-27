package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Complaint;

public interface Complaints extends CrudRepository<Complaint, Long> {
    @Query("SELECT c " +
            "FROM Complaint c " +
            "WHERE (:id is NULL or c.id = :id) AND " +
            "(:authorId is NULL or c.authorId = :authorId) AND " +
            "(:recipeId is NULL or c.recipeId = :recipeId) AND " +
            "(:severity is NULL or c.severity = :severity) AND " +
            "(:reason is NULL or c.reason = :reason)")
    List<Complaint> find(Long id, Long authorId, Long recipeId, Integer severity, String reason);
}
