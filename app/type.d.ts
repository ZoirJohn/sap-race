import type { store } from "./store/store"

export type Racer = {
    id: number
    name: string
    color: string
}

export type Winner = {
    id: number
    wins: number
    time: number
}

export type Movement = {
    id: number
    velocity: number
    distance: number
}

export type RacerStatus = "started" | "stopped"

export type RacersStoreDispatch = typeof store.dispatch
