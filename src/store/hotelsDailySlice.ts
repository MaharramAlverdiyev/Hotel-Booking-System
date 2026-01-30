import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Meal {
    id?: number;
    name?: string;
    price?: number;
}

interface HotelSelection {
    hotel?: { id: number; name: string; price: number };
    lunch?: Meal;
    dinner?: Meal;
}

interface HotelsDailyState {
    selections: HotelSelection[];
}

const initialState: HotelsDailyState = {
    selections: [], // refresh zamanı sıfırlansın
};

const hotelsDailySlice = createSlice({
    name: "hotelsDaily",
    initialState,
    reducers: {
        saveHotelSelection: (state, action: PayloadAction<HotelSelection[]>) => {
            state.selections = action.payload;
        },
        clearHotelSelection: (state) => {
            state.selections = [];
        },
    },
});

export const { saveHotelSelection, clearHotelSelection } = hotelsDailySlice.actions;
export default hotelsDailySlice.reducer;
