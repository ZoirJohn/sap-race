import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchCars } from "~/api/client"
import Garage from "~/components/layout/Garage"
import Tools from "~/components/layout/Tools"

import type { store } from "~/store/store"
import type { Car } from "~/type"

export default function Home() {
    const dispatch = useDispatch<typeof store.dispatch>()

    const cars = useSelector<ReturnType<typeof store.getState>>(
        (state) => state.cars.racers,
    )
	
    useEffect(() => {
        dispatch(fetchCars())
    }, [])

    return (
        <section>
            <Container>
				<Tools />
                <Garage cars={cars as Car[]} />
            </Container>
        </section>
    )
}
