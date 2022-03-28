package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateCaloriesDTO;
import recipes.fridger.backend.model.Calorie;

public interface CaloriesService {
    public void createCalorie(CreateCaloriesDTO dto);
    public void deleteCalorie(Long id);
    public Calorie getCalorieById(Long id);
    public Iterable<Calorie> getCalories(Long id, Long userId, String title, Long calorieCount);

}