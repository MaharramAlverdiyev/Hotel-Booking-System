import { BoardCode } from "./board";
import { Hotel } from "./hotel";
import { Meal } from "./meal";

export interface Day {
  hotel?: Hotel;
  lunch?: Meal;
  dinner?: Meal;
}

export interface BookingState {
  citizenship: string;
  destination: string;
  days: number;
  boardType: BoardCode;
  selections: Day[];
}