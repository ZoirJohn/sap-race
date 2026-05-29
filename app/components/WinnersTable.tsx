import { Col, Container, Row } from "react-bootstrap"
import type { Racer, Winner } from "~/type"
import Car from "../ui/Car"

export default function WinnersTable(props: { winners: (Winner & Racer)[] }) {
    return (
        <Container>
            <Row className="py-3 sm:text-2xl">
                <Col>#</Col>
                <Col>Car</Col>
                <Col>Name</Col>
                <Col>Wins</Col>
                <Col>Best time</Col>
            </Row>
            {props.winners.map((winner, idx) => {
                return (
                    <Row
                        className="sm:py-3 py-1 sm:text-xl items-center"
                        key={winner.id}
                    >
                        <Col>{winner.id}</Col>
                        <Col>
                            <Car color={winner.color} className="size-10!" />
                        </Col>
                        <Col>{winner.name}</Col>
                        <Col>{winner.wins}</Col>
                        <Col>{winner.time}</Col>
                    </Row>
                )
            })}
        </Container>
    )
}
