import { add, remove, set, type store } from "~/store/store"

const url = (end: string) => import.meta.env.VITE_API_URL + end

export function fetchCars() {
    return async function fetchCarsThunk(
        dispatch: typeof store.dispatch,
        getState: typeof store.getState,
    ) {
        try {
            if (getState().cars.length) return
            const res = await fetch(url("/garage"))
            const data = await res.json()
            dispatch(set(data))
        } catch (error) {}
    }
}

export function fetchCarById(id: string) {
    return async function fetchCarByIdThunk(
        dispatch: typeof store.dispatch,
        getState: typeof store.getState,
    ) {
        try {
            const res = await fetch(id)
            const data = await res.json()
            dispatch(add(data))
        } catch (error) {}
    }
}
