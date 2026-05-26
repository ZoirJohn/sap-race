import {
    addMovements,
    setRacer,
    setRacers,
    setWinners,
    type store,
} from "~/store/store"
import type { RacersStoreDispatch, RacerStatus } from "~/type"

export function fetchCars() {
    return async function fetchCarsThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage", import.meta.env.VITE_API_URL)
        try {
            if (getState().cars.racers.length) return
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setRacers(data))
        } catch (error) {}
    }
}

export function fetchCarById(id: string) {
    return async function fetchCarByIdThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", id)
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setRacer(data))
        } catch (error) {}
    }
}

export function fetchWinners() {
    return async function fetchWinnersThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/winners", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setWinners(data))
        } catch (error) {}
    }
}

export function fetchMovement(id: string, status: RacerStatus) {
    return async function fetchMovementThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/engine", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", id)
        url.searchParams.set("status", status)
        try {
            if (
                getState()
                    .cars.movements.map((racer) => racer.id)
                    .includes(Number(id))
            ) {
                return
            }
            const res = await fetch(url, { method: "PATCH" })
            const data = await res.json()
            dispatch(addMovements({ ...data, id: Number(id) }))
        } catch (error) {}
    }
}
