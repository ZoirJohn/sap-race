import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import type { Racer, RacersStoreDispatch } from "~/type"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import CarComponent from "../ui/Car"
import { useDispatch } from "react-redux"
import { fetchMovement } from "~/api/client"
import Trash from "../ui/Trash"
import Select from "../ui/Select"

export default function Garage(props: { cars: Racer[] }) {
    const dispatch = useDispatch<RacersStoreDispatch>()
    function startEngine(id: string) {
        dispatch(fetchMovement(id, "started"))
    }
    return (
        <Stack className="py-4" gap={4}>
            {props.cars.map((car) => {
                return (
                    <Col
                        className="items-center flex sm:gap-4 gap-2 "
                        key={car.id}
                    >
                        <div className="flex gap-2 max-md:flex-col max-w-31 flex-wrap">
                            <Button
                                variant="light"
                                className="flex items-center justify-center"
                                onClick={() => startEngine(String(car.id))}
                            >
                                <Key className="sm:size-8 size-6" />
                            </Button>
                            <Button variant="warning">
                                <Stop className="sm:size-8 size-6 fill-white" />
                            </Button>
                            <Button variant="danger">
                                <Trash />
                            </Button>
                            <Button>
                                <Select />
                            </Button>
                        </div>
                        <div className="flex items-center">
                            <CarComponent color={car.color} />
                        </div>
                    </Col>
                )
            })}
        </Stack>
    )
}
