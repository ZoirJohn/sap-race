import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Racer } from "~/type"

export default function Home() {
    const cars = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    )

    return (
        <section>
            <Container>
                <Tools />
                <Garage cars={cars as Racer[]} />
            </Container>
        </section>
    )
}
