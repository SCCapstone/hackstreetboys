package recipes.fridger.backend.service;

import java.util.List;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

public interface PantryService {
    public void createPantry(CreatePantryDTO dto);
    public void deletePantry(Long id);
    public Pantry getPantryByID(Long id);
    public Iterable<Pantry> getPantries(Long pantry);

}