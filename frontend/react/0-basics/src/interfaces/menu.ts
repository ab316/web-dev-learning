export interface IRecipe {
  name: string;
  ingredients: IIngredient[];
  steps: string[];
}

export interface IIngredient {
  name: string;
  amount: number;
  measurement: string;
}
