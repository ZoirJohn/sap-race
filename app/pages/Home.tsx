import { useMemo, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteAllMovements, fetchAllMovements } from "~/api/client"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Movement, Racer, RacersStoreDispatch } from "~/type"

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

    const winnerId = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.winnerId,
    )

    const winner = useMemo(() => {
        return racers.find((rac) => rac.id === winnerId)
    }, [winnerId])

    const winnerAnnouncementTimeout = useMemo(() => {
        return (
            movements
                .map((mov) => mov.distance / mov.velocity)
                .sort((a, b) => b - a)[0] || -1
        )
    }, [movements])

    const disableAll = () => {
        setDisabled(racers.map((racer) => racer.id))
    }
    const unDisableAll = () => {
        setDisabled([-1])
    }

    function startAllEngines() {
        disableAll()
        dispatch(fetchAllMovements())
    }
    function stopAllEngines() {
        unDisableAll()
        dispatch(deleteAllMovements())
    }
    return (
        <section>
            <Container>
                <Tools
                    selected={selected}
                    disableAll={disableAll}
                    unDisableAll={unDisableAll}
                    startAllEngines={startAllEngines}
                    stopAllEngines={stopAllEngines}
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
                />
            </Container>
        </section>
    )
}
