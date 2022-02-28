package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateFavoriteDTO;
import recipes.fridger.backend.model.Favorite;

public interface FavoritesService {
    public void createFavorite(CreateFavoriteDTO dto);
    public void deleteFavorite(Long id);
    public Favorite getFavoriteById(Long id);
    public Iterable<Favorite> getFavorites(Long id, Long userId, Long recipeId);

}