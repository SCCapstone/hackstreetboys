package recipes.fridger.backend.service;

import java.util.List;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

public interface PantryService {
    public void createPantry(CreatePantryDTO dto);
    public void deletePantry(Long id);
    public void clearPantry();
    public Pantry getPantryByUserID(Long id);
    public Iterable<Pantry> getAllPantrys();
    //public Iterable<Pantry> getPantries(Long pantry);

}
