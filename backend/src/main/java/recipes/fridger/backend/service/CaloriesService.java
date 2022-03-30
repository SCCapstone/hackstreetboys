package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateCaloriesDTO;
import recipes.fridger.backend.model.Calorie;

import java.util.Date;

public interface CaloriesService {
    public void createCalorie(CreateCaloriesDTO dto);
    public void deleteCalorie(Long id);
    public Calorie getCalorieById(Long id);
    public Iterable<Calorie> getCalories(Long id, Long userId, String title, Long calorieCount, Date dateAdded);
    public Iterable<Calorie> getCaloriesByUserId(Long userId);

}