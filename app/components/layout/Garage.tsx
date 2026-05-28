import { Button, Col, Stack } from "react-bootstrap"
import type { Movement, Racer, RacersStoreDispatch } from "~/type"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import CarComponent from "../ui/Car"
import { useDispatch } from "react-redux"
import { deleteCar, deleteMovement, fetchMovement } from "~/api/client"
import Trash from "../ui/Trash"
import Select from "../ui/Select"
import { useState } from "react"

export default function Garage(props: {
    racers: Racer[]
    movements: Movement[]
    setSelected: (id: number) => void
}) {
    const dispatch = useDispatch<RacersStoreDispatch>()
    const [disabled, setDisabled] = useState([-1])
    function startEngine(id: string) {
        dispatch(fetchMovement(id, "started"))
    }
    function stopEngine(id: string) {
        dispatch(deleteMovement(id, "stopped"))
    }
    function removeCar(id: string) {
        dispatch(deleteCar(id))
    }
    console.log(props.movements)
    return (
        <Stack className="py-4 relative" gap={4}>
            {props.racers.map((racer) => {
                const data = props.movements.find((mov) => mov.id === racer.id)
                const speed = data?.velocity ? data.distance / data.velocity : 0
                return (
                    <Col
                        className="flex items-center gap-2 sm:gap-4"
                        key={racer.id}
                    >
                        <div className="flex flex-wrap gap-2 max-w-31">
                            <Button
                                variant="light"
                                className="flex justify-center items-center"
                                onClick={() => {
                                    startEngine(String(racer.id))
                                    setDisabled((prev) => [...prev, racer.id])
                                }}
                                disabled={disabled.includes(racer.id)}
                            >
                                <Key />
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => {
                                    stopEngine(String(racer.id))
                                    setDisabled((prev) => [
                                        ...prev.filter((id) => id !== racer.id),
                                    ])
                                }}
                            >
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
                        <div className="relative flex items-center h-full w-full">
                            <CarComponent
                                color={racer.color}
                                className={
                                    "block transition-[left] absolute left-0 ease-linear z-2" +
                                    " " +
                                    (speed > 0 ? ` left-full` : "")
                                }
                                style={{
                                    transitionDuration: speed + "ms",
                                }}
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
