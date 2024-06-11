import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    value: BookingState
}

type BookingState = {
    isLoading: boolean,
    bookings: [],
}

const initialState = {
    value: {
        isLoading: true,
        bookings: [],
    }
} as InitialState

type bookingPayload = {
    isLoading: boolean,
    bookings: [],
}

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookingData: (state, action: PayloadAction<bookingPayload>) => {
            return {
                value: {
                    isLoading: action.payload.isLoading,
                    bookings: action.payload.bookings,
                }
            }
        }
    }
})

export const { setBookingData } = bookingSlice.actions

export default bookingSlice.reducer;

