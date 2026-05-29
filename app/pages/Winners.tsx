import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchWinners } from "~/api/client"
import WinnersTable from "~/components/WinnersTable"
import { setOrderBy, setSortBy, type store } from "~/store/store"
import type { Order, Racer, RacersStoreDispatch, Sort, Winner } from "~/type"

export default function Winners() {
    const dispatch = useDispatch<RacersStoreDispatch>()

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

    const changeOrder = (order: Order) => {
        dispatch(setOrderBy(order))
        dispatch(fetchWinners())
    }
    const changeSort = (sort: Sort) => {
        dispatch(setSortBy(sort))
        dispatch(fetchWinners())
    }

    return (
        <section>
            <Container>
                <WinnersTable
                    winners={winners}
                    order={order}
                    sort={sort}
                    changeOrder={changeOrder}
                    changeSort={changeSort}
                />
            </Container>
        </section>
    )
}
