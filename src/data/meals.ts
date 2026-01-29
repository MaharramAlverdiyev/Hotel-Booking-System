import { MealsByCountry } from "../types/meal";

const meals: MealsByCountry = {
  Turkey: {
    lunch: [
      { id: 4, name: "Chicken Pilaf", price: 10 },
      { id: 5, name: "Lentil Soup Set", price: 8 },
    ],
    dinner: [
      { id: 1, name: "Turkish Kebab", price: 15 },
      { id: 2, name: "Istanbul Fish Plate", price: 18 },
    ],
  },
  UAE: {
    lunch: [
      { id: 9, name: "Shawarma Plate", price: 12 },
    ],
    dinner: [
      { id: 7, name: "Arabic Mixed Grill", price: 25 },
    ],
  },
};

export default meals;