import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from './slices/dashboardSlice'
import authSlice  from './slices/AuthSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


