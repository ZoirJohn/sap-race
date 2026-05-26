import { useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Racer } from "~/type"

export default function Home() {
    const [selected, setSelected] = useState<number | undefined>()
    const racers = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    )

    return (
        <section>
            <Container>
                <Tools selected={selected} />
                <Garage racers={racers as Racer[]} setSelected={setSelected} />
            </Container>
        </section>
    )
}
