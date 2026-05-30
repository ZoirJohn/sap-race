import { useMemo, useState } from "react"
import { Button, Container, PageItem, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    deleteAllMovements,
    fetchAllMovements,
    fetchRacers,
    generateRandomCars,
} from "~/api/client"
import Garage from "~/components/Garage"
import Tools from "~/components/Tools"

import { setCurrentRacersPage, type store } from "~/store/store"
import type { Movement, Racer, RacersStoreDispatch } from "~/type"
import findWinnerCar from "~/utils/findWinnerCar"

export default function Home() {
    const [selected, setSelected] = useState<number | undefined>()
    const [disabled, setDisabled] = useState([-1])

    const dispatch = useDispatch<RacersStoreDispatch>()

    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    ) as Racer[]
    const movements = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.movements,
    ) as Movement[]
    const currentRacersPage = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.currentRacersPage,
    )
    const totalRacers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.totalRacers,
    ) as number
    const racersPerPage = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racersPerPage,
    ) as number
    const winnerId = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winnerId,
    ) as number
    const winner = useMemo(() => {
        return findWinnerCar(winnerId, racers)
    }, [winnerId, racers])

    const winnerAnnouncementTimeout = useMemo(() => {
        return (
            movements
                .map((movement) => movement.distance / movement.velocity)
                .sort((a, b) => b - a)[0] || -1
        )
    }, [movements])
    const isWinnerAnnounced = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.isWinnerAnnounced,
    ) as boolean

    const disableAll = () => {
        setDisabled(racers.map((racer) => racer.id))
    }
    const unDisableAll = () => {
        setDisabled([-1])
    }
    const startAllEngines = () => {
        disableAll()
        dispatch(fetchAllMovements())
    }
    const stopAllEngines = () => {
        unDisableAll()
        dispatch(deleteAllMovements())
    }
    const generateCars = async () => {
        await dispatch(generateRandomCars())
    }
    return (
        <section>
            <Container>
				<h1 className="mt-2 mb-0">Garage</h1>
                <Tools
                    selected={selected}
                    disableAll={disableAll}
                    unDisableAll={unDisableAll}
                    startAllEngines={startAllEngines}
                    stopAllEngines={stopAllEngines}
                    generateCars={generateCars}
                />
                <Garage
                    racers={racers}
                    movements={movements}
                    setSelected={setSelected}
                    setDisabled={setDisabled}
                    disabled={disabled}
                    winnerAnnouncementTimeout={Math.ceil(
                        winnerAnnouncementTimeout,
                    )}
                    winner={winner}
                    isWinnerAnnounced={isWinnerAnnounced}
                />
                <Pagination className="flex-wrap">
                    {new Array(Math.ceil(totalRacers / racersPerPage))
                        .fill(0)
                        .map((_, i) => (
                            <PageItem
                                active={i + 1 === currentRacersPage}
                                key={i}
                                onClick={() => {
                                    dispatch(setCurrentRacersPage(i + 1))
                                    dispatch(fetchRacers())
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
