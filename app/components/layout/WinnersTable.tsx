import { Col, Container, Row } from "react-bootstrap"
import type { Racer, Winner } from "~/type"
import Car from "../ui/Car"

export default function WinnersTable(props: {
    winners: Winner[]
    racers: Racer[]
}) {
    const data: (Winner & Racer)[] = props.winners.map((winner, idx) => ({
        ...winner,
        ...(props.racers.find((racer, idx) => racer.id === winner.id) || {
            color: "",
            name: "",
        }),
    }))
    return (
        <Container>
            <Row className="py-3 sm:text-2xl">
                <Col>#</Col>
                <Col>Car</Col>
                <Col>Name</Col>
                <Col>Wins</Col>
                <Col>Best time</Col>
            </Row>
            {data.map((racerData, idx) => {
                return (
                    <Row
                        className="sm:py-3 py-1 sm:text-xl items-center"
                        key={racerData.id}
                    >
                        <Col>{racerData.id}</Col>
                        <Col>
                            <Car color={racerData.color} className="size-10!" />
                        </Col>
                        <Col>{racerData.name}</Col>
                        <Col>{racerData.wins}</Col>
                        <Col>{racerData.time}</Col>
                    </Row>
                )
            })}
        </Container>
    )
}
