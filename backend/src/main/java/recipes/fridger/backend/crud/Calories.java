package recipes.fridger.backend.crud;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Calorie;

public interface Calories extends CrudRepository<Calorie, Long> {

    @Query("SELECT c " +
            "FROM Calorie c " +
            "WHERE (:id is NULL or c.id = :id) AND " +
            "(:userId is NULL or c.userId = :userId) AND " +
            "(:title is NULL or c.title = :title) AND " +
            "(:calorieCount is NULL or c.calorieCount = :calorieCount) AND " +
            "(:dateAdded is NULL or c.dateAdded :dateAdded)")
    List<Calorie> find(Long id, Long userId, String title, Long calorieCount, Date dateAdded);
    @Query("SELECT c FROM Calorie c WHERE (c.userId = :userId) AND (c.dateAdded >= now - 1)")
    List<Calorie> findFromLastDay(Long userId);
}