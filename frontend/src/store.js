import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import scheduleReducer from './slices/scheduleSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        schedule: scheduleReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default store