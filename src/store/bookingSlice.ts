import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BookingData = {
    citizenship?: { id: number; name: string };
    country?: { id: number; name: string };
    board?: { code: string; name: string };
    startDate: string;
    endDate: string;
};

type BookingState = {
    booking: BookingData | null;
};

const initialState: BookingState = {
    booking: null,
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        saveBooking(state, action: PayloadAction<BookingData>) {
            state.booking = action.payload;
            localStorage.setItem("bookingData", JSON.stringify(action.payload));
        },
        loadBookingFromStorage(state) {
            const data = localStorage.getItem("bookingData");
            if (data) {
                state.booking = JSON.parse(data);
            }
        },
    },
});

export const { saveBooking, loadBookingFromStorage } = bookingSlice.actions;
export default bookingSlice.reducer;