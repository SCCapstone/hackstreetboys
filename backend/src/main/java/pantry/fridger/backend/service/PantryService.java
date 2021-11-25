package pantry.fridger.backend.service;

import pantry.fridger.backend.dto.CreatePantryDTO;
import pantry.fridger.backend.model.Pantry;

import java.util.List;

public interface PantryService {
    public void createPantry(CreatePantryDTO dto);
    public void deletePantry(Integer id);
    public List<Pantry> getAllPantries(Integer pantry);
    public Pantry getPantry(Integer id);

}
