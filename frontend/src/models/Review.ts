export interface Review{
    id: number,
    authorId: number,
    authorName: string,
    recipeId: number,
    rating: number,
    feedback: string;
}