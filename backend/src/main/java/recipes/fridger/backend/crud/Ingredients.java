package recipes.fridger.backend.crud;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Ingredient;

public interface Ingredients extends CrudRepository<Ingredient, Long> {
    @Query("SELECT i " +
           "FROM Ingredient i " +
           "WHERE (:id is NULL or i.id = :id) AND " +
                "(:name is NULL or i.name = :name) AND " +
                "(:calories is NULL or i.calories = :calories) AND " +
                "(:carbohydrates is NULL or i.carbohydrates = :carbohydrates) AND " +
                "(:protein is NULL or i.protein = :protein) AND " +
                "(:fat is NULL or i.fat = :fat) AND " +
                "(:alcohol is NULL or i.alcohol = :alcohol) AND " +
                "(:cost is NULL or i.cost = :cost)")
    List<Ingredient> find(Long id, String name, Integer calories, Integer carbohydrates, Integer protein, Integer fat, Boolean alcohol, Double cost);

//    @Query("select i from Ingredient i where (:name = i.name)")
//    Optional<Ingredient> findByName(String name);

}