import { useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Movement, Racer } from "~/type"

export default function Home() {
    const [selected, setSelected] = useState<number | undefined>()
    const [disabled, setDisabled] = useState([-1])

    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    ) as Racer[]

    const movements = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.movements,
    ) as Movement[]

    const disableAll = () => {
        setDisabled(racers.map((racer) => racer.id))
    }
    const unDisableAll = () => {
        setDisabled([-1])
    }
    return (
        <section>
            <Container>
                <Tools
                    selected={selected}
                    disableAll={disableAll}
                    unDisableAll={unDisableAll}
                />
                <Garage
                    racers={racers}
                    movements={movements}
                    setSelected={setSelected}
                    setDisabled={setDisabled}
                    disabled={disabled}
                />
            </Container>
        </section>
    )
}
