package recipes.fridger.backend.crud;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Pantry;

public interface Pantries extends CrudRepository<Pantry,Long> {
    @Query("select p from Pantry p where (:id is null or p.id = :id)")
    List<Pantry> find(Long id);

}
