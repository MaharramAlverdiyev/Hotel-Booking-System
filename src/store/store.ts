import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import hotelsDailyReducer from "./hotelsDailySlice";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        hotelsDaily: hotelsDailyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;