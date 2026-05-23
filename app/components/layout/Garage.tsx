import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import type { Car } from "~/type"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import CarComponent from "../ui/Car"

export default function Garage(props: { cars: Car[] }) {
    return (
        <Stack className="py-4" gap={4}>
            {props.cars.map((car) => {
                return (
                    <>
                        <Col className="items-center flex sm:gap-4 gap-2">
                            <div className="flex gap-2 max-md:flex-col">
                                <Button
                                    variant="light"
                                    className="flex items-center justify-center "
                                >
                                    <Key className="sm:size-8 size-6" />
                                </Button>
                                <Button variant="danger">
                                    <Stop className="sm:size-8 size-6 fill-white" />
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <CarComponent color={car.color} />
                            </div>
                        </Col>
                    </>
                )
            })}
        </Stack>
    )
}
