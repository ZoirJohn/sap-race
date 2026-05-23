import { createSlice, configureStore } from "@reduxjs/toolkit"
import type { Car } from "~/type"

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        cars: [] as Car[],
    },
    reducers: {
        add: (state, action: { payload: Car; type: string }) => {
            state.cars.push(action.payload)
        },
        remove: (state, action: { payload: Car; type: string }) => {
            state.cars.pop()
        },
        set: (state, action: { payload: Car[]; type: string }) => {
            state.cars = action.payload
        },
    },
})
export const { add, remove, set } = counterSlice.actions

export const store = configureStore({
    reducer: counterSlice.reducer,
})
