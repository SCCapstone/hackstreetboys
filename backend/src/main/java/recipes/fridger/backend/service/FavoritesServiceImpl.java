package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Favorites;
import recipes.fridger.backend.dto.CreateFavoriteDTO;
import recipes.fridger.backend.model.Favorite;

import javax.transaction.Transactional;

import java.util.Optional;

@Service
public class FavoritesServiceImpl implements FavoritesService{

    @Autowired
    private Favorites favorites;

    @Override
    public void createFavorite(CreateFavoriteDTO dto) {
        Optional<Favorite> favoriteTest = checkIfExists(dto.getUserId(),dto.getRecipeId());
        if (favoriteTest.isEmpty()) {
            Favorite f = new Favorite();
            f.setUserId(dto.getUserId());
            f.setRecipeId(dto.getRecipeId());
            favorites.save(f);
        }
        else{
            System.out.println("A duplicate favorite was attempted. UserID: " + dto.getUserId() + " | RecipeId: " + dto.getRecipeId());
        }
    }

    @Transactional
    @Override
    public void deleteFavorite(Long id) {
        Optional<Favorite> favorite = favorites.findById(id);
        if (favorite.isPresent()) {
            Favorite f = favorite.get();
            favorites.delete(f);
        }
    }

    @Transactional
    @Override
    public Favorite getFavoriteById(Long id) {
        Optional<Favorite> favorite = favorites.findById(id);
        return favorite.isPresent() ? favorite.get() : null;
    }

    @Transactional
    @Override
    public Iterable<Favorite> getFavorites(Long id, Long userId, Long recipeId) {
        return favorites.find(id, userId, recipeId);
    }

    @Transactional
    @Override
    public Optional<Favorite> checkIfExists(Long userId, Long recipeId) {
        return favorites.findByUserIdAndRecipeId(userId, recipeId);
        }
}
