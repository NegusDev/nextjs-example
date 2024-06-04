import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";


type InitialState = {
    value: AuthState
}

type AuthState = {
    isAuth: boolean,
    username: string,
    email: string,
    roleID: string,
    userID: string
}

const initialState = {
    value: {
        isAuth: false,
        username: '',
        email: '',
        roleID: '',
        userID: '',
    }

} as InitialState;

type LogInPayload = {
    username: string,
    email: string,
    roleID: string,
    userID: string
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        logIn: (state, action: PayloadAction<LogInPayload>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                    email: action.payload.email,
                    roleID: action.payload.roleID,
                    userID: action.payload.userID,
                },
            };
        }
    }
})

export const { logOut, logIn } = authSlice.actions


export default authSlice.reducer;