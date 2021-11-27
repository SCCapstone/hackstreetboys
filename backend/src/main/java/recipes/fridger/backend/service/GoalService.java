package recipes.fridger.backend.service;

import recipes.fridger.backend.dto.CreateGoalDTO;
import recipes.fridger.backend.model.Goal;

public interface GoalService {
    public void createGoal(CreateGoalDTO dto);
    public void deleteGoal(Long id);
    public Goal getGoalByID(Long id);
    public Iterable<Goal> getGoals(Long GoalId);

}
