import { Button, Col, Container, Row } from "react-bootstrap"
import type { Order, Racer, Sort, Winner } from "~/type"
import Car from "./ui/Car"
import { useState } from "react"

export default function WinnersTable(props: {
    winners: (Winner & Racer)[]
    sort: Sort
    order: Order
}) {
    return (
        <Container>
            <Row className="py-3 sm:text-2xl flex items-center">
                <Col id={"id"}>
                    <Button variant="outline-primary">#</Button>
                </Col>
                <Col>Car</Col>
                <Col>Name</Col>
                <Col id={"wins"}>
                    <Button variant="outline-primary">Wins</Button>
                </Col>
                <Col id={"time"}>
                    <Button variant="outline-primary">Time</Button>
                </Col>
            </Row>
            {props.winners.map((winner) => {
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
