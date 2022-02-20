package recipes.fridger.backend.controller;
import java.util.*;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import recipes.fridger.backend.crud.Favorites;
import recipes.fridger.backend.dto.CreateFavoriteDTO;
import recipes.fridger.backend.dto.ReturnFavoriteDTO;
import recipes.fridger.backend.model.Favorite;
import recipes.fridger.backend.service.FavoritesService;

@Controller
@Slf4j
@ResponseBody
@RequestMapping(path = "/v1/favorites")
public class FavoriteController {
    @Autowired
    private Favorites favorites;
    @Autowired
    private FavoritesService favoritesService;

    @PostMapping(path = "/")
    public ResponseEntity<String>
    createFavorite(@RequestBody @Valid CreateFavoriteDTO f) {
        try {
            favoritesService.createFavorite(f);
            log.info("Successful creation of favorite");
            log.info(String.valueOf(f));
            return ResponseEntity.ok("Created favorite");
        } catch (Exception e) {
            log.warn("Unable to create favorite\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to create favorite\n" + e.getMessage());
        }
    }
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable Long id) {
        try {
            favoritesService.deleteFavorite(id);
            log.info("Successfully deleted favorite #" + id);
            return ResponseEntity.ok("Deleted favorite");
        } catch (Exception e) {
            log.warn("Unable to delete favorite\n" + e.getMessage());
            return ResponseEntity.internalServerError().body("Unable to delete favorite");
        }
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Favorite getFavorite(@PathVariable Long id) {
        return favoritesService.getFavoriteById(id);
    }
    @GetMapping(path = "/")
    public @ResponseBody Iterable<Favorite>
    getIngredients(@RequestParam(required = false) Long id,
                   @RequestParam(required = false) Long userId,
                   @RequestParam(required = false) Long recipeId)
    {
        return favoritesService.getFavorites(id, userId, recipeId);
    }
}
