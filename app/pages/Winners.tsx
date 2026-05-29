import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import WinnersTable from "~/components/WinnersTable"
import type { store } from "~/store/store"
import type { Racer, Winner } from "~/type"

export default function Winners() {
    const winners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winners,
    ) as (Winner & Racer)[]
    return (
        <section>
            <Container>
                <WinnersTable winners={winners} />
            </Container>
        </section>
    )
}
