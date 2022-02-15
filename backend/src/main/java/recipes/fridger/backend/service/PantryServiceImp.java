package recipes.fridger.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

import javax.transaction.Transactional;

@Service
public class PantryServiceImp implements PantryService {

    @Autowired
    private Pantries pantries;

    @Override
    public void createPantry(CreatePantryDTO dto) {
        Pantry pantry = new Pantry();
        pantry.setUserID(dto.getUserID());
        pantry.setIngredientID(dto.getIngredientID());
        pantry.setDescription(dto.getDescription());
        pantry.setNumIngredient(dto.getNumIngredient());
        pantries.save(pantry);
    }
    @Transactional
    @Override
    public void deletePantry(Long id) {
        Optional<Pantry> p = pantries.findById(id);
        if(p.isPresent()) {
            Pantry u = p.get();
            pantries.delete(u);
        }
    }

    @Transactional
    @Override
    public Pantry getPantryByUserID(Long id) {
        Optional<Pantry> p = pantries.findByUser(id);
        return p.isPresent() ? p.get() : null;
    }

    @Transactional
    public Iterable<Pantry> getPantries(Long pantryId) {
        return pantries.find(pantryId);
    }



}
