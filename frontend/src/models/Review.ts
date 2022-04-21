/*
  The model; variables for a review
*/

export interface Review{
    id: number,
    authorId: number,
    authorName: string,
    recipeId: number,
    rating: number,
    feedback: string;
}