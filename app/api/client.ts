import {
    setError,
    setIsWinnerAnnounced,
    setMovements,
    setRacers,
    setTotalRacers,
    setTotalWinners,
    setWinner,
    setWinners,
    type store,
} from "~/store/store"
import type {
    Movement,
    Racer,
    RacersStoreDispatch,
    RacerStatus,
    Winner,
} from "~/type"
import findWinnerMovement from "~/utils/findWinnerMovement"

export function fetchRacers() {
    return async function fetchRacersThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("garage", import.meta.env.VITE_API_URL)
        url.searchParams.set("_page", String(getState().cars.currentRacersPage))
        url.searchParams.set("_limit", String(getState().cars.racersPerPage))
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch(
                setTotalRacers(
                    (Number(res.headers.get("X-Total-Count")) || 0) as number,
                ),
            )
            dispatch(setRacers(data))
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}

export async function fetchRacer(id: number) {
    const url = new URL("garage/" + id, import.meta.env.VITE_API_URL)
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
        }
    }
}

export function fetchWinners() {
    return async function fetchWinnersThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("winners", import.meta.env.VITE_API_URL)
        url.searchParams.set(
            "_page",
            String(getState().cars.currentWinnersPage),
        )
        url.searchParams.set("_limit", String(getState().cars.winnersPerPage))
        url.searchParams.set("_sort", getState().cars.sort)
        url.searchParams.set("_order", getState().cars.order)
        try {
            const res = await fetch(url)
            const data: Winner[] = await res.json()

            const winners = []
            for (const winner of data) {
                const winnersData: Racer = await fetchRacer(winner.id)
                if (winnersData.id) {
                    winners.push({ ...winner, ...winnersData })
                }
            }
            dispatch(
                setTotalWinners(
                    (Number(res.headers.get("X-Total-Count")) || 0) as number,
                ),
            )
            dispatch(setWinners(winners))
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
        const url = new URL("engine", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", String(id))
        url.searchParams.set("status", status)
        try {
            const res = await fetch(url, { method: "PATCH" })
            const data = await res.json()
            dispatch(
                setMovements([
                    ...getState().cars.movements.filter(
                        (movement) => movement.id !== id,
                    ),
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
                const url = new URL("engine", import.meta.env.VITE_API_URL)
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
        const url = new URL("engine", import.meta.env.VITE_API_URL)
        url.searchParams.set("id", String(id))
        url.searchParams.set("status", status)
        try {
            dispatch(
                setMovements([
                    ...getState().cars.movements.filter(
                        (movement) => movement.id !== id,
                    ),
                ]),
            )
            await fetch(url, { method: "PATCH" })
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
            for (const movement of movements) {
                const url = new URL("engine", import.meta.env.VITE_API_URL)
                url.searchParams.set("id", String(movement.id) as string)
                url.searchParams.set("status", "stopped")
                await fetch(url, { method: "PATCH" })
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
        const url = new URL("garage", import.meta.env.VITE_API_URL)
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    color,
                }),
            })
            await res.json()
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
        const url = new URL("garage/" + id, import.meta.env.VITE_API_URL)
        try {
            await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    color,
                }),
            })
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
        const url = new URL("garage/" + id, import.meta.env.VITE_API_URL)
        try {
            await fetch(url, {
                method: "DELETE",
            })

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
export function deleteWinner(id: number) {
    return async function deleteWinnerThunk(
        dispatch: RacersStoreDispatch,
        getState: typeof store.getState,
    ) {
        const url = new URL("winners/" + id, import.meta.env.VITE_API_URL)
        try {
            await fetch(url, { method: "DELETE" })
            dispatch(fetchWinners())
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message))
            }
        }
    }
}
