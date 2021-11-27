package recipes.fridger.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

@Service
public class PantryServiceImp implements PantryService {

    private ArrayList<Pantry> pantries;
    @Override
    public void createPantry(CreatePantryDTO dto) {
        Pantry pantry = new Pantry();
        pantry.setOwnerId(dto.getOwnerId());
        pantry.setPantry(dto.getPantry());
        pantry.setDescription(dto.getDescription());
        pantries.add(pantry);
    }
    @Override
    public void deletePantry(Integer id) {
        for(int i=0;i<pantries.size();i++) {
            if(pantries.get(i).getId()==id)
                pantries.remove(pantries.get(i));
        }
    }

    @Override
    public List<Pantry> getAllPantries(Integer pantry) {
        return pantries;
    }

    @Override
    public Pantry getPantry(Integer id) {
        for(int i=0;i<pantries.size();i++) {
            if(pantries.get(i).getId()==id)
                return pantries.get(i);
        }
        return null;
    }

}
