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
        <Stack className="py-4 relative" gap={4}>
            {props.racers.map((racer) => {
                return (
                    <Col
                        className="flex items-center gap-2 sm:gap-4"
                        key={racer.id}
                    >
                        <div className="flex flex-wrap gap-2 max-w-31">
                            <Button
                                variant="light"
                                className="flex justify-center items-center"
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
                        <div className="group relative flex items-center py-8 w-full">
                            <CarComponent
                                color={racer.color}
                                className="block transition-all duration-2000 absolute group-hover:left-full left-0 ease-linear z-2"
                            />
                            <p className="right-1/2 left-0 absolute w-full text-center text-2xl">
                                {racer.name}
                            </p>
                        </div>
                    </Col>
                )
            })}
            <div className="right-0 w-20 h-[calc(100%-48px)] absolute top-6 checkered"></div>
        </Stack>
    )
}
