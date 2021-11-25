package pantry.fridger.backend.crud;

import java.util.List;
import pantry.fridger.backend.model.Pantry;


public interface Pantries extends CrudRepository<Pantry, Integer> {
    @Query("Select p from Pantry p where (:id is null or r.id = :id)")
    List<Pantry> find(Integer id);

}
