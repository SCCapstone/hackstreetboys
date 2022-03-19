export interface Recipe{
    id: number;
    title: string;
    author: number;
    authorName: string;
    description: string;
    body: string;
    imgSrc: string;
    totalTime: number;
    prepTime: number,
    cookTime: number,
    yield: number,
    estimatedCost: number,
    alcoholic: boolean,
    type: string,
    tags: string,
    ingredientIds: string,
    rating: number;
}