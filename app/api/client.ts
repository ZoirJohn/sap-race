import { addMovements, setRacers, setWinners, type store } from "~/store/store"
import type { RacersStoreDispatch, RacerStatus } from "~/type"

export function fetchRacers() {
    return async function fetchRacersThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setRacers(data))
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

export function createCar(name: string, color: string) {
    return async function createCarThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    color,
                }),
            })
            const data = await res.json()
            dispatch(fetchRacers())
        } catch (error) {}
    }
}
export function updateCar(id: string, name: string, color: string) {
    return async function updateCarThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage/" + id, import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    color,
                }),
            })
            const data = await res.json()
            dispatch(fetchRacers())
        } catch (error) {}
    }
}
export function deleteCar(id: string) {
    return async function updateCarThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/garage/" + id, import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url, {
                method: "DELETE",
            })
            const data = await res.json()
            dispatch(fetchRacers())
        } catch (error) {}
    }
}
