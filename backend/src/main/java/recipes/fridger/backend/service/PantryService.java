package recipes.fridger.backend.service;

import java.util.List;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

public interface PantryService {
    public void createPantry(CreatePantryDTO dto);
    public void deletePantry(Long id);
    public void clearPantry();
    public void clearUserPantry(Long userID);
    public void incrementPantryByOne(Long id);
    public void decrementPantryByOne(Long id);
    public Pantry getPantryByUserID(Long userID);
    public Pantry getPantryByPantryID(Long id);
    public Iterable<Pantry> getAllPantrys();


    //public Iterable<Pantry> getPantries(Long pantry);

}
