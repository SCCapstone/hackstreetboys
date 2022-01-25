package recipes.fridger.backend.crud;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import recipes.fridger.backend.model.Goal;

public interface Goals extends CrudRepository<Goal, Long> {
    
        @Query("select g from Goal g where (:id is null or g.id = :id)")
        List<Goal> find(Long id);


    }

