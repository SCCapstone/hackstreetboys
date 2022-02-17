package recipes.fridger.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import recipes.fridger.backend.crud.Pantries;
import recipes.fridger.backend.dto.CreatePantryDTO;
import recipes.fridger.backend.model.Pantry;

import javax.transaction.Transactional;

@Slf4j
@Service
public class PantryServiceImp implements PantryService {

    @Autowired
    private Pantries pantries;

    @Override
    public void createPantry(CreatePantryDTO dto) {
        Pantry pantry = new Pantry();
        pantry.setUserID(dto.getUserID());
        pantry.setIngredientName(dto.getIngredientName());
        pantry.setNumIngredient(dto.getNumIngredient());
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
    public Pantry getPantryByUserID(Long id) {
        Optional<Pantry> p = pantries.findByUser(id);
        return p.isPresent() ? p.get() : null;
    }

    @Transactional
    @Override
    public Iterable<Pantry> getAllPantrys() {
        List<Pantry> retPan = pantries.findAllPantrys();
        for(Pantry s: retPan){
            log.info("pantryID: " + s.getId());
            log.info("userID: " + s.getUserID());
            log.info("ingredientID: " + s.getIngredientName());
            log.info("numIngredient: " + s.getNumIngredient());
            log.info("description: " + s.getDescription());
        }
        return retPan;
    }

    @Transactional
    public Iterable<Pantry> getPantries(Long pantryId) {
        return pantries.find(pantryId);
    }



}
