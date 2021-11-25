package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Review;

public interface Reviews extends CrudRepository<Review, Long> {
    @Query("select r from Review r where (:id is null or r.id = :id)")
    List<Review> find(Long id);
}