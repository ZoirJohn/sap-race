import {
    setError,
    setIsWinnerAnnounced,
    setMovements,
    setRacers,
    setWinner,
    setWinners,
    type store,
} from "~/store/store"
import type { Movement, RacersStoreDispatch, RacerStatus } from "~/type"
import findWinnerMovement from "~/utils/findWinnerMovement"

export function fetchRacers() {
    return async function fetchRacersThunk(dispatch: RacersStoreDispatch) {
        const url = new URL("/garage", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setRacers(data))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export function fetchWinners() {
    return async function fetchWinnersThunk(dispatch: RacersStoreDispatch) {
        const url = new URL("/winners", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(setWinners(data))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export function fetchMovement(id: number, status: RacerStatus) {
    return async function fetchMovementThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/engine", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", String(id))
        url.searchParams.set("status", status)
        try {
            const res = await fetch(url, { method: "PATCH" })
            const data = await res.json()
            dispatch(
                setMovements([
                    ...getState().cars.movements.filter((mov) => mov.id !== id),
                    { ...data, id },
                ]),
            )
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export function fetchAllMovements() {
    return async function fetchAllMovementsThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        try {
            const notStarted = new Set()
            for (const racer of getState().cars.racers) {
                notStarted.add(racer.id)
            }
            for (const movement of getState().cars.movements) {
                notStarted.delete(movement.id)
            }

            const movements: Movement[] = []
            for (const id of notStarted) {
                const url = new URL("/engine", import.meta.env.VITE_API_URL)
                url.searchParams.set("id", id as string)
                url.searchParams.set("status", "started")
                const res = await fetch(url, { method: "PATCH" })
                const data = await res.json()
                movements.push({ ...data, id })
            }

            const winner = findWinnerMovement(movements)
            dispatch(
                createWinner(
                    winner.id,
                    Math.floor(winner.distance / winner.velocity / 100),
                ),
            )
            dispatch(setWinner(winner.id))
            dispatch(setMovements(movements))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}
export function deleteMovement(id: number, status: RacerStatus) {
    return async function deleteMovementThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("/engine", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", String(id))
        url.searchParams.set("status", status)
        try {
            const res = await fetch(url, { method: "PATCH" })
            const data = await res.json()
            dispatch(
                setMovements([
                    ...getState().cars.movements.filter((mov) => mov.id !== id),
                ]),
            )
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export function deleteAllMovements() {
    return async function deleteAllMovementsThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        try {
            const movements = getState().cars.movements
            dispatch(setMovements([]))
            dispatch(setIsWinnerAnnounced(false))
            dispatch(setWinner(-1))
            for (const mov of movements) {
                const url = new URL("/engine", import.meta.env.VITE_API_URL)
                url.searchParams.set("id", String(mov.id) as string)
                url.searchParams.set("status", "stopped")
                const res = await fetch(url, { method: "PATCH" })
                const data = await res.json()
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
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
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}
export function updateCar(id: number, name: string, color: string) {
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
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}
export function deleteCar(id: number) {
    return async function deleteCarThunk(
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
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export function createWinner(id: number, time: number) {
    return async function createWinnerThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        try {
            const winner = getState().cars.winners.find(
                (rac) => rac.id === Number(id),
            )
            if (winner) {
                const url = new URL(
                    "winners/" + id,
                    import.meta.env.VITE_API_URL,
                )

                await fetch(url, {
                    headers: { "Content-Type": "application/json" },
                    method: "PUT",
                    body: JSON.stringify({
                        wins: (winner?.wins || 0) + 1,
                        time: winner?.time,
                    }),
                })
            } else {
                const url = new URL("winners", import.meta.env.VITE_API_URL)

                await fetch(url, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        wins: 1,
                        time: time,
                        id,
                    }),
                })
            }

            dispatch(fetchWinners())
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}
