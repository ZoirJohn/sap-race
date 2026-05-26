import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit"
import type { Movement, Racer, Winner } from "~/type"

const cars = createSlice({
    name: "cars",
    initialState: {
        racers: [] as Racer[],
        winners: [] as Winner[],
        movements: [] as Movement[],
        racer: {} as Racer,
    },
    reducers: {
        addRacers: (state, action: { payload: Racer; type: string }) => {
            state.racers.push(action.payload)
        },
        removeRacers: (state, action: { payload: Racer; type: string }) => {
            state.racers.pop()
        },
        setRacers: (state, action: { payload: Racer[]; type: string }) => {
            state.racers = action.payload
        },
        addWinners: (state, action: { payload: Winner; type: string }) => {
            state.winners.push(action.payload)
        },
        setWinners: (state, action: { payload: Winner[]; type: string }) => {
            state.winners = action.payload
        },
        addMovements: (state, action: { payload: Movement }) => {
            state.movements.push(action.payload)
        },
        setRacer: (state, action: { payload: Racer }) => {
            state.racer = action.payload
        },
    },
})
export const {
    addRacers,
    removeRacers,
    setRacers,
    addWinners,
    setWinners,
    setRacer,
    addMovements,
} = cars.actions

export const store = configureStore({
    reducer: combineReducers({ cars: cars.reducer }),
})
