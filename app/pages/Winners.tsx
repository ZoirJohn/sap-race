import { Container, PageItem, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchWinners } from "~/api/client"
import WinnersTable from "~/components/WinnersTable"
import {
    setCurrentWinnersPage,
    setOrderBy,
    setSortBy,
    type store,
} from "~/store/store"
import type { Order, Racer, RacersStoreDispatch, Sort, Winner } from "~/type"

export default function Winners() {
    const dispatch = useDispatch<RacersStoreDispatch>()

    const winners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winners,
    ) as (Winner & Racer)[]

    const totalWinners = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.totalWinners,
    ) as number
    const winnersPerPage = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winnersPerPage,
    ) as number
    const currentWinnersPage = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.currentWinnersPage,
    ) as number

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
				<h1 className="mb-0 mt-2">Winners</h1>
                <WinnersTable
                    winners={winners}
                    order={order}
                    sort={sort}
                    changeOrder={changeOrder}
                    changeSort={changeSort}
                />
                <Pagination className="flex-wrap">
                    {new Array(Math.ceil(totalWinners / winnersPerPage))
                        .fill(0)
                        .map((_, i) => (
                            <PageItem
                                active={i + 1 === currentWinnersPage}
                                key={i}
                                onClick={() => {
                                    dispatch(setCurrentWinnersPage(i + 1))
                                    dispatch(fetchWinners())
                                }}
                            >
                                {i + 1}
                            </PageItem>
                        ))}
                </Pagination>
            </Container>
        </section>
    )
}
