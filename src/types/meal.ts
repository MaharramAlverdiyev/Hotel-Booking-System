export interface Meal {
  id: number;
  name: string;
  price: number;
}

export interface MealsByCountry {
  [country: string]: {
    lunch: Meal[];
    dinner: Meal[];
  };
}