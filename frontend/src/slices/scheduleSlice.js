import { createSlice } from "@reduxjs/toolkit"
import { actions } from "react-table"
import authSlice from "./authSlice"

const initialState = {
    schedules: null
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setSchedules: (state, action) => {
            state.schedules = action.payload
        }
    }
})

export const { setSchedules } = scheduleSlice.actions
export default scheduleSlice.reducer