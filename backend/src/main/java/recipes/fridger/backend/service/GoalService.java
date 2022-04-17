package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;

public interface GoalService {
    public void createGoal(CreateGoalDTO dto);
    public void deleteGoal(Long id);
    public Goal getGoalByID(Long id);
    public Iterable<Goal> getGoals(Long id, String endGoal, Integer calories, Integer carbs, Integer protein, Integer fat, Double currWeight, Double goalWeight, Long userId);
    Object goalCheck(String endGoal, Integer calories, Integer carbs, Integer protein, Integer fat, Double currWeight, Double goalWeight, Long userId);
}
