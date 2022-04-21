package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;

public interface GoalService {
    //interface for all methods
    //create a goal by passing in dto
    public void createGoal(CreateGoalDTO dto);

    //delete a goal by id
    public void deleteGoal(Long id);

    //get a goal by id
    public Goal getGoalByID(Long id);

    //get all goals matching params
    public Iterable<Goal> getGoals(Long id, String endGoal, Double calories, Double carbs, Double protein, Double fat, Double currWeight, Double goalWeight, Long userId);

}
