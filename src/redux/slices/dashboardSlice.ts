import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    value: DashboardState
}

type DashboardState = {
    isLoading: boolean,
    users: number,
    admins: number,
    reservations: number,
    daily: number,
    uncleared: [],
}

const initialState = {
    value: {
        isLoading: true,
        users: 0,
        admins: 0,
        reservations: 0,
        daily: 0,
        uncleared: [],
    }
} as InitialState

type dashboardPayload = {
    isLoading: boolean,
    users: number,
    admins: number,
    reservations: number,
    daily: number,
    uncleared: [],
}


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardData: (state, action: PayloadAction<dashboardPayload>) => {
            return {
                value: {
                    isLoading: action.payload.isLoading,
                    users: action.payload.users,
                    admins: action.payload.admins,
                    reservations: action.payload.reservations,
                    daily: action.payload.daily,
                    uncleared: action.payload.uncleared,
                }
            }
        },
    }
})

export const { setDashboardData } = dashboardSlice.actions

export default dashboardSlice.reducer;