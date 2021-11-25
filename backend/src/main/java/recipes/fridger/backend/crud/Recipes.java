package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Recipe;

public interface Recipes extends CrudRepository<Recipe, Long> {
    @Query("select r from Recipe r where (:id is null or r.id = :id)")
    List<Recipe> find(Long id);
}
