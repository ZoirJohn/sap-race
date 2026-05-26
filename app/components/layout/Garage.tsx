import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import type { Racer, RacersStoreDispatch } from "~/type"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import CarComponent from "../ui/Car"
import { useDispatch } from "react-redux"
import { deleteCar, fetchMovement, updateCar } from "~/api/client"
import Trash from "../ui/Trash"
import Select from "../ui/Select"

export default function Garage(props: {
    racers: Racer[]
    setSelected: (id: number) => void
}) {
    const dispatch = useDispatch<RacersStoreDispatch>()
    function startEngine(id: string) {
        dispatch(fetchMovement(id, "started"))
    }
    function removeCar(id: string) {
        dispatch(deleteCar(id))
    }

    return (
        <Stack className="py-4" gap={4}>
            {props.racers.map((racer) => {
                return (
                    <Col
                        className="items-center flex sm:gap-4 gap-2 "
                        key={racer.id}
                    >
                        <div className="flex gap-2 max-w-31 flex-wrap">
                            <Button
                                variant="light"
                                className="flex items-center justify-center"
                                onClick={() => startEngine(String(racer.id))}
                            >
                                <Key />
                            </Button>
                            <Button variant="warning">
                                <Stop />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => removeCar(String(racer.id))}
                            >
                                <Trash />
                            </Button>
                            <Button onClick={() => props.setSelected(racer.id)}>
                                <Select />
                            </Button>
                        </div>
                        <div className="flex items-center">
                            <CarComponent color={racer.color} />
                            {racer.name}
                        </div>
                    </Col>
                )
            })}
        </Stack>
    )
}
