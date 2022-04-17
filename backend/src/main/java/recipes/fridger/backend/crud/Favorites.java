/*
    Favorites crud:
    four functions that are considered necessary to implement a persistent storage application
 */
package recipes.fridger.backend.crud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Favorite;

public interface Favorites extends CrudRepository<Favorite, Long> {

    @Query("SELECT f " +
            "FROM Favorite f " +
            "WHERE (:id is NULL or f.id = :id) AND " +
            "(:userId is NULL or f.userId = :userId) AND " +
            "(:recipeId is NULL or f.recipeId = :recipeId) ")
    List<Favorite> find(Long id, Long userId, Long recipeId);

    @Query("SELECT f " +
            "FROM Favorite f " +
            "WHERE (:userId is NULL or f.userId = :userId) AND " +
            "(:recipeId is NULL or f.recipeId = :recipeId) ")
    Optional<Favorite> findByUserIdAndRecipeId(Long userId, Long recipeId);

}