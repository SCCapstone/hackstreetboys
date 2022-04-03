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
import recipes.fridger.backend.model.Ingredient;
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
    public void clearUserPantry(Long userID) {
        List<Pantry> p = pantries.findUserPantry(userID);
        for(Pantry pan : p) {
            pantries.delete(pan);
        }
    }

    @Transactional
    @Override
    public void clearPantry() {
        List<Pantry> p = pantries.findAllPantrys();
        for(Pantry pan : p) {
            pantries.delete(pan);
        }
    }

    @Transactional
    @Override
    public void incrementPantryByOne(Long id) {
        Optional<Pantry> p = pantries.findById(id);
        if(p.isPresent()) {

            Pantry pan = p.get();
            pan.setNumIngredient(pan.getNumIngredient()+1);
            pantries.save(pan);
            log.info("Incrementing "+pan.getIngredientName()+" by 1");
        } else {
            log.info("Did not increment by 1. Item could not be found by id=" + id);
        }
    }

    @Transactional
    @Override
    public void decrementPantryByOne(Long id) {
        Optional<Pantry> p = pantries.findById(id);
        if(p.isPresent()) {

            Pantry pan = p.get();
            pan.setNumIngredient(pan.getNumIngredient()-1);
            pantries.save(pan);
            log.info("Decrementing "+pan.getIngredientName()+" by 1");
        } else {
            log.info("Did not decrement by 1. Item could not be found by id=" + id);
        }
    }

    @Transactional
    @Override
    public Iterable<Pantry> getPantryByUserID(Long id) {
        return pantries.findUserPantry(id);
    }

    public Pantry getSinglePantryByUser(Long id) {
        return pantries.getSinglePantryByUser(id);
    }

    @Transactional
    @Override
    public Iterable<Pantry> getAllPantrys() {
        List<Pantry> retPan = pantries.findAllPantrys();
//        for(Pantry s: retPan){
//            log.info("pantryID: " + s.getId());
//            log.info("userID: " + s.getUserID());
//            log.info("ingredientID: " + s.getIngredientName());
//            log.info("numIngredient: " + s.getNumIngredient());
//            log.info("description: " + s.getDescription());
//        }
        return retPan;
    }

    @Transactional
    public Iterable<Pantry> getPantries(Long pantryId) {
        return pantries.find(pantryId);
    }



}
