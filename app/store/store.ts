import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit"
import type { Movement, Racer, Winner } from "~/type"

const cars = createSlice({
    name: "cars",
    initialState: {
        racers: [] as Racer[],
        winners: [] as (Winner & Racer)[],
        movements: [] as Movement[],
        racer: {} as Racer,
        error: "",
        currentRacersPage: 1,
        currentWinnersPage: 1,
        racersPerPage: 7,
        winnersPerPage: 10,
        winnerId: -1,
        isWinnerAnnounced: false,
        totalRacers: 0,
    },
    reducers: {
        setRacers: (state, action: { payload: Racer[]; type: string }) => {
            state.racers = action.payload
        },
        setWinners: (
            state,
            action: { payload: (Winner & Racer)[]; type: string },
        ) => {
            state.winners = action.payload
        },
        setMovements: (state, action: { payload: Movement[] }) => {
            state.movements = action.payload
        },
        setRacer: (state, action: { payload: Racer }) => {
            state.racer = action.payload
        },
        setError: (state, action: { payload: string }) => {
            state.error = action.payload
        },
        setWinner: (state, action: { payload: number }) => {
            state.winnerId = action.payload
        },
        setIsWinnerAnnounced: (state, action: { payload: boolean }) => {
            state.isWinnerAnnounced = action.payload
        },
        setTotalRacers: (state, action: { payload: number }) => {
            state.totalRacers = action.payload
        },
    },
})
export const {
    setRacers,
    setWinners,
    setRacer,
    setMovements,
    setError,
    setWinner,
    setIsWinnerAnnounced,
    setTotalRacers,
} = cars.actions

export const store = configureStore({
    reducer: combineReducers({ cars: cars.reducer }),
})
