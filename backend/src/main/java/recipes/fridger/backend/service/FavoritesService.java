package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateFavoriteDTO;
import recipes.fridger.backend.model.Favorite;

import java.util.Optional;

public interface FavoritesService {
    //interface for all methods
    //creates a favorite by passing in dto
    public void createFavorite(CreateFavoriteDTO dto);

    //deletes a favorite by passing in id
    public void deleteFavorite(Long id);

    //gets a favorite by id
    public Favorite getFavoriteById(Long id);

    //gets favorite matching params
    public Iterable<Favorite> getFavorites(Long id, Long userId, Long recipeId);

    //checks if a favorite exists
    public Optional<Favorite> checkIfExists(Long userId, Long recipeId);

}