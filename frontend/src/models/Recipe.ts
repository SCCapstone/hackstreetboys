export interface Recipe{
    id: number;
    title: string;
    author: string;
    description: string;
    totalTime: number;
    prepTime: number,
    cookTime: number,
    yield: number,
    estimatedCost: number,
    type: string,
    tags: string[],
    ingredients: string[],
    rating: number;
}