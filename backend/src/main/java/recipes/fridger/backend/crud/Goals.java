/*
    Goals crud:
    four functions that are considered necessary to implement a persistent storage application
 */
package recipes.fridger.backend.crud;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Goal;

public interface Goals extends CrudRepository<Goal, Long> {

    @Query("SELECT g " +
            "FROM Goal g " +
            "WHERE (:id is NULL or g.id = :id) AND " +
            "(:endGoal is NULL or g.endGoal = :endGoal) AND " +
            "(:calories is NULL or g.calories = :calories) AND " +
            "(:carbohydrates is NULL or g.carbohydrates = :carbohydrates) AND " +
            "(:protein is NULL or g.protein = :protein) AND " +
            "(:fat is NULL or g.fat = :fat) AND " +
            "(:currentWeight is NULL or g.currentWeight = :currentWeight) AND " +
            "(:goalWeight is NULL or g.goalWeight = :goalWeight) AND" +
            "(:userId is NULL or g.userId = :userId)")
        List<Goal> find(Long id, String endGoal, Integer calories, Integer carbohydrates, Integer protein, Integer fat, Double currentWeight, Double goalWeight, Long userId);


    }

