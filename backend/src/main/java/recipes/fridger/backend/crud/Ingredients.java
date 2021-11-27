package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Ingredient;

public interface Ingredients extends CrudRepository<Ingredient, Long> {
    @Query("select i from Ingredient i where (:id is null or i.id = :id)")
    List<Ingredient> find(Long id);
}