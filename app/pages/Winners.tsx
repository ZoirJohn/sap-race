import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchWinners } from "~/api/client"
import WinnersTable from "~/components/layout/WinnersTable"
import type { store } from "~/store/store"
import type { Racer, Winner } from "~/type"

export default function Winners() {
    const dispatch = useDispatch<typeof store.dispatch>()

    const winners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winners,
    )
    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    )
    useEffect(() => {
        dispatch(fetchWinners())
    }, [])
    return (
        <section>
            <Container>
                <WinnersTable
                    winners={winners as Winner[]}
                    racers={racers as Racer[]}
                />
            </Container>
        </section>
    )
}
