import { useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Movement, Racer } from "~/type"

export default function Home() {
    const [selected, setSelected] = useState<number | undefined>()
    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    ) as Racer[]
    const movements = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.movements,
    ) as Movement[]
    return (
        <section>
            <Container>
                <Tools selected={selected} />
                <Garage
                    racers={racers}
                    movements={movements}
                    setSelected={setSelected}
                />
            </Container>
        </section>
    )
}
