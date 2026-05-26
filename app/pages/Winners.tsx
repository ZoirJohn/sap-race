import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import WinnersTable from "~/components/layout/WinnersTable"
import type { store } from "~/store/store"
import type { Racer, Winner } from "~/type"

export default function Winners() {
    const winners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winners,
    )
    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    )
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
