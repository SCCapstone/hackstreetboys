package recipes.fridger.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

@Service
public class PantryServiceImp implements PantryService {

    @Autowired
    private Pantries pantries;

    @Override
    public void createPantry(CreatePantryDTO dto) {
        Pantry pantry = new Pantry();
        //pantry.setOwnerId(dto.getOwnerId());
        pantry.setIngredientID(dto.getPantry());
        pantry.setDescription(dto.getDescription());
        pantry.setDescription(dto.getDescription());
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
    public Pantry getPantryByID(Long id) {
        Optional<Pantry> p = pantries.findById(id);
        return p.isPresent() ? p.get() : null;
    }

    @Transactional
    public Iterable<Pantry> getPantries(Long pantryId) {
        return pantries.find(pantryId);
    }



}
