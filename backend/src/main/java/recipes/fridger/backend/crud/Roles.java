package recipes.fridger.backend.crud;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import recipes.fridger.backend.model.Role;
import recipes.fridger.backend.model.RoleEnum;

import java.util.Optional;

public interface Roles extends CrudRepository<Role, Integer> {
    @Query("select r from Role r where (r.name = :name)")
    Optional<Role> findByName(RoleEnum name);
}
