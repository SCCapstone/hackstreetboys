export interface Recipe{
    id: number;
    title: string;
    author: string;
    description: string;
    body: string;
    imgSrc: string;
    totalTime: number;
    prepTime: number,
    cookTime: number,
    yield: number,
    estimatedCost: number,
    type: string,
    tags: string,
    ingredientIds: string,
    rating: number;
}