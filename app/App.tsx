import { useEffect, type ReactNode } from "react"
import { useDispatch } from "react-redux"
import { fetchRacers, fetchWinners } from "~/api/client"
import Header from "~/components/Header"
import type { RacersStoreDispatch } from "./type"

export default function AppRoot(props: { children: ReactNode }) {
    const dispatch = useDispatch<RacersStoreDispatch>()

    useEffect(() => {
        dispatch(fetchRacers())
        dispatch(fetchWinners())
    }, [])
    return (
        <div id="wrapper">
            <Header />
            <main className="grow shrink-0">{props.children}</main>
        </div>
    )
}
