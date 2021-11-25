package recipes.fridger.backend.service;


import java.util.List;

import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

public interface PantryService {
    public void createPantry(CreatePantryDTO dto);
    public void deletePantry(Integer id);
    public List<Pantry> getAllPantries(Integer pantry);
    public Pantry getPantry(Integer id);

}
