import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import WinnersTable from "~/components/WinnersTable"
import type { store } from "~/store/store"
import type { Order, Racer, Sort, Winner } from "~/type"

export default function Winners() {
    const winners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winners,
    ) as (Winner & Racer)[]

    const totalWinners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.totalRacers,
    )

    const sort = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.sort,
    ) as Sort
    const order = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.order,
    ) as Order

    return (
        <section>
            <Container>
                <WinnersTable winners={winners} order={order} sort={sort} />
            </Container>
        </section>
    )
}
