import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit"
import type { Car, Winner } from "~/type"

const cars = createSlice({
    name: "cars",
    initialState: {
        racers: [] as Car[],
        racer: {} as Car,
        winners: [] as Winner[],
    },
    reducers: {
        addRacers: (state, action: { payload: Car; type: string }) => {
            state.racers.push(action.payload)
        },
        removeRacers: (state, action: { payload: Car; type: string }) => {
            state.racers.pop()
        },
        setRacers: (state, action: { payload: Car[]; type: string }) => {
            state.racers = action.payload
        },
        addWinners: (state, action: { payload: Winner; type: string }) => {
            state.winners.push(action.payload)
        },
        setWinners: (state, action: { payload: Winner[]; type: string }) => {
            state.winners = action.payload
        },
    },
})
export const { addRacers, removeRacers, setRacers, addWinners, setWinners } =
    cars.actions

export const store = configureStore({
    reducer: combineReducers({ cars: cars.reducer }),
})
