package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Review;

public interface Reviews extends CrudRepository<Review, Long> {
    @Query("SELECT r " +
            "FROM Review r " +
            "WHERE (:id is NULL or r.id = :id) AND " +
                "(:authorId is NULL or r.authorId = :authorId) AND " +
                "(:recipeId is NULL or r.recipeId = :recipeId) AND " +
                "(:rating is NULL or r.rating = :rating) AND " +
                "(:feedback is NULL or r.feedback = :feedback)")
    List<Review> find(Long id, Long authorId, Long recipeId, Integer rating, String feedback);

    @Query("select AVG(r.rating) from Review r where r.recipeId = :recipeId")
    Double getAverageRating(Long recipeId);
}