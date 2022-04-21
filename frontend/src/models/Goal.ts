/*
  The model; variables for a goal
*/

export interface Goal{
    id: number;
    endGoal: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    currentWeight: number;
    goalWeight: number;
    userId: number;
}