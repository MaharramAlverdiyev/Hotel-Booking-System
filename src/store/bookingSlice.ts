import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BookingData {
    citizenship?: { id: number; name: string };
    country?: { id: number; name: string };
    board?: { code: string; name: string };
    startDate?: string;
    endDate?: string;
}

interface BookingState {
    booking: BookingData | null;
}

const initialState: BookingState = {
    booking: null, 
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        saveBooking: (state, action: PayloadAction<BookingData>) => {
            state.booking = action.payload;
        },
        clearBooking: (state) => {
            state.booking = null;
        },
    },
});

export const { saveBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;