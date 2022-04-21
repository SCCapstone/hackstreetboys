package recipes.fridger.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recipes.fridger.backend.crud.Goals;
import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;

import javax.transaction.Transactional;

import java.util.Optional;

@Service
public class GoalServiceImpl implements GoalService{

    @Autowired
    private Goals goals;

    //create goal by passing in dto and set al values
    @Override
    public void createGoal(CreateGoalDTO dto) {
        Goal g = new Goal();
        g.setEndGoal(dto.getEndGoal());
        g.setCalories(dto.getCalories());
        g.setCarbohydrates(dto.getCarbohydrates());
        g.setProtein(dto.getProtein());
        g.setFat(dto.getFat());
        g.setCurrentWeight(dto.getCurrentWeight());
        g.setGoalWeight(dto.getGoalWeight());
        g.setUserId(dto.getUserId());
        goals.save(g);
    }

    //delete a goal by id
    @Transactional
    @Override
    public void deleteGoal(Long id) {
        Optional<Goal> goal = goals.findById(id);
        if (goal.isPresent()) {
            Goal u = goal.get();
            goals.delete(u);
        }
    }

    //get a goal by id
    @Transactional
    @Override
    public Goal getGoalByID(Long id) {
        Optional<Goal> goal = goals.findById(id);
        return goal.isPresent() ? goal.get() : null;
    }


    //get goals matching params
    @Transactional
    @Override
    public Iterable<Goal> getGoals(Long id, String endGoal, Double calories, Double carbs, Double protein, Double fat, Double currWeight, Double goalWeight, Long userId) {
        return goals.find(id, endGoal, calories, carbs, protein, fat, currWeight, goalWeight, userId);
    }
}
