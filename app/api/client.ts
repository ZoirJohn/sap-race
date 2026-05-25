import { setRacers, setWinners, type store } from "~/store/store"

const url = (end: string) => import.meta.env.VITE_API_URL + end

export function fetchCars() {
    return async function fetchCarsThunk(
        dispatch: typeof store.dispatch,
        getState: typeof store.getState,
    ) {
        try {
            if (getState().cars.racers.length) return
            const res = await fetch(url("/garage"))
            const data = await res.json()
            dispatch(setRacers(data))
        } catch (error) {}
    }
}

export function fetchCarById(id: string) {
    return async function fetchCarByIdThunk(
        dispatch: typeof store.dispatch,
        getState: typeof store.getState,
    ) {
        try {
            const res = await fetch(url("/garage/" + id))
            const data = await res.json()
            // dispatch(add(data))
        } catch (error) {}
    }
}

export function fetchWinners() {
    return async function fetchWinnersThunk(
        dispatch: typeof store.dispatch,
        getState: typeof store.getState,
    ) {
        try {
            const res = await fetch(url("/winners"))
            const data = await res.json()
            dispatch(setWinners(data))
        } catch (error) {}
    }
}
