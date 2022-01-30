package recipes.fridger.backend.crud;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Recipe;

public interface Recipes extends CrudRepository<Recipe, Long> {
    @Query("select r from Recipe r where (:id is null or r.id = :id) and "
            + "(:cookTime is null or r.cookTime <= :cookTime) and "
            + "(:prepTime is null or r.prepTime <= :prepTime) and "
//            + "(:alcoholic is null or r.alcoholic = :alcoholic) and "
            + "(:estimatedCost is null or r.estimatedCost <= :estimatedCost) and "
            + "(:rating is null or r.rating <= :rating) and "
            + "(:tags is null or r.tags =: tags) and "
            + "(:type is null or r.type = :type) and "
            + "(:ingredientIds is null or r.ingredientIds = :ingredientIds) and "
            + "(:title is null or r.title = :title) ORDER BY r.ingredientIds DESC")
            List<Recipe> find(Long id, Integer cookTime, Integer prepTime, Double estimatedCost,Double rating, String tags, String type, String ingredientIds, String title);

    @Query("select r from Recipe r where (:title is null or r.title = :title) and "
            + "(:author is null or r.author = :author) ORDER BY r.title DESC")
            Recipe findByTitleAndAuthor(String title, String author);
}
