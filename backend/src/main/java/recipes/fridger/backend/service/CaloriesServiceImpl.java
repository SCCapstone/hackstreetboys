package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Calories;
import recipes.fridger.backend.dto.CreateCaloriesDTO;
import recipes.fridger.backend.model.Calorie;

import javax.transaction.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class CaloriesServiceImpl implements CaloriesService{

    @Autowired
    private Calories calories;

    //Takes in calorie dto then sets all values
    @Override
    public void createCalorie(CreateCaloriesDTO dto) {
        Calorie c = new Calorie();
        c.setUserId(dto.getUserId());
        c.setTitle(dto.getTitle());
        c.setCalorieCount(dto.getCalorieCount());
        c.setDateAdded(new Date());
        calories.save(c);
    }

    //Finds the calorie item by id and deletes it by passing it in
    @Transactional
    @Override
    public void deleteCalorie(Long id) {
        Optional<Calorie> calorie = calories.findById(id);
        if (calorie.isPresent()) {
            Calorie c = calorie.get();
            calories.delete(c);
        }
    }

    //Gets single calorie by id if it exists.
    @Transactional
    @Override
    public Calorie getCalorieById(Long id) {
        Optional<Calorie> calorie = calories.findById(id);
        return calorie.isPresent() ? calorie.get() : null;
    }

    //returns all calories matching paramteters
    @Transactional
    @Override
    public Iterable<Calorie> getCalories(Long id, Long userId, String title, Long calorieCount, Date dateAdded) {
        return calories.find(id, userId, title, calorieCount, dateAdded);
    }

    //returns all calories by a user
    @Transactional
    @Override
    public Iterable<Calorie> getCaloriesByUserId(Long userId) {
        return calories.findFromLastDay(userId);
    }
}
