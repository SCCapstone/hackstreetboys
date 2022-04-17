package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateCaloriesDTO;
import recipes.fridger.backend.model.Calorie;

import java.util.Date;

public interface CaloriesService {
    //interface for all methods
    //Creates calorie, takes in calorie DTO
    public void createCalorie(CreateCaloriesDTO dto);

    //Deletes calorie, takes in calorie id
    public void deleteCalorie(Long id);

    //gets calorie by id
    public Calorie getCalorieById(Long id);

    //gets all calories matching params
    public Iterable<Calorie> getCalories(Long id, Long userId, String title, Long calorieCount, Date dateAdded);

    //gets all calories by a specific user
    public Iterable<Calorie> getCaloriesByUserId(Long userId);

}