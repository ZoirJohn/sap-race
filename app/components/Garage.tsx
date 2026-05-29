import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Stack,
} from "react-bootstrap"
import type { Movement, Racer, RacersStoreDispatch } from "~/type"
import Key from "./ui/Key"
import Stop from "./ui/Stop"
import CarComponent from "./ui/Car"
import { useDispatch } from "react-redux"
import {
    deleteCar,
    deleteMovement,
    deleteWinner,
    fetchMovement,
} from "~/api/client"
import Trash from "./ui/Trash"
import Select from "./ui/Select"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { setIsWinnerAnnounced } from "~/store/store"

export default function Garage(props: {
    racers: Racer[]
    movements: Movement[]
    setSelected: (id: number) => void
    disabled: number[]
    setDisabled: Dispatch<SetStateAction<number[]>>
    winnerAnnouncementTimeout: number
    winner: Racer | undefined
    isWinnerAnnounced: boolean
}) {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch<RacersStoreDispatch>()

    function startEngine(id: number) {
        dispatch(fetchMovement(id, "started"))
    }
    function stopEngine(id: number) {
        dispatch(deleteMovement(id, "stopped"))
    }
    function removeCar(id: number) {
        dispatch(deleteCar(id))
        dispatch(deleteWinner(id))
    }

    useEffect(() => {
        let timeout: number
        if (
            props.winnerAnnouncementTimeout !== -1 &&
            !props.isWinnerAnnounced
        ) {
            timeout = window.setTimeout(() => {
                setShow(true)
                dispatch(setIsWinnerAnnounced(true))
            }, props.winnerAnnouncementTimeout)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [props.winnerAnnouncementTimeout])

    return (
        <>
            <Stack className="py-4 relative max-lg:overflow-hidden" gap={4}>
                {props.racers.length ? (
                    props.racers.map((racer) => {
                        const data = props.movements.find(
                            (mov) => mov.id === racer.id,
                        )
                        const speed = data?.velocity
                            ? data.distance / data.velocity
                            : 0
                        return (
                            <Col
                                className="flex items-center gap-2 sm:gap-4"
                                key={racer.id}
                            >
                                <div className="flex flex-wrap gap-2 sm:max-w-31 max-w-23">
                                    <Button
                                        variant="light"
                                        className="flex justify-center items-center"
                                        onClick={() => {
                                            startEngine(racer.id)
                                            props.setDisabled(
                                                (prev) =>
                                                    [
                                                        ...prev,
                                                        racer.id,
                                                    ] as number[],
                                            )
                                        }}
                                        disabled={props.disabled.includes(
                                            racer.id,
                                        )}
                                    >
                                        <Key />
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            stopEngine(racer.id)
                                            props.setDisabled((prev) => [
                                                ...prev.filter(
                                                    (id) => id !== racer.id,
                                                ),
                                            ])
                                        }}
                                    >
                                        <Stop />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => removeCar(racer.id)}
                                    >
                                        <Trash />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            props.setSelected(racer.id)
                                        }
                                    >
                                        <Select />
                                    </Button>
                                </div>
                                <div className="relative flex items-center h-full w-full">
                                    <CarComponent
                                        color={racer.color}
                                        className={
                                            "block transition-[left] absolute left-0 ease-linear z-2" +
                                            " " +
                                            (speed > 0
                                                ? ` md:left-full left-[calc(100%-64px)]`
                                                : "")
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
                    })
                ) : (
                    <Col className="text-center text-2xl">No race today</Col>
                )}
                {props.racers.length ? (
                    <div className="right-0 max-sm:right-16 sm:w-20 w-10 h-[calc(100%-48px)] absolute top-6 checkered"></div>
                ) : null}
            </Stack>
            {props.winner && (
                <Modal
                    show={props.isWinnerAnnounced && show}
                    onHide={() => setShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader closeButton className="border-none!">
                        <ModalTitle>Winner!</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex items-center flex-col justify-center">
                            <CarComponent color={props.winner.color} />
                            {props.winner.name}
                        </div>
                    </ModalBody>
                </Modal>
            )}
        </>
    )
}
