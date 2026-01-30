import type { Country } from "./country";

export interface Meal extends Country {
 price: number;
}

export interface MealsByCountry {
  [country: string]: {
    lunch: Meal[];
    dinner: Meal[];
  };
}

// context api ile yazilmalidir.  
// form ucun formik up ve ya react form
// json file ile fetch 