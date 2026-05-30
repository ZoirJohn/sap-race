import { Button, Col, Container, Row } from "react-bootstrap"
import type { Order, Racer, Sort, Winner } from "~/type"
import Car from "./ui/Car"

export default function WinnersTable(props: {
    winners: (Winner & Racer)[]
    sort: Sort
    order: Order
    changeOrder: (order: Order) => void
    changeSort: (sort: Sort) => void
}) {
    const handleSort = (name: Sort) => {
        if (props.sort === name) {
            if (props.order === "DESC") {
                props.changeOrder("ASC")
            } else {
                props.changeOrder("DESC")
            }
        } else {
            props.changeSort(name)
        }
    }

    return (
        <Container>
            <Row className="py-3 sm:text-2xl flex items-center">
                <Col>
                    <Button
                        variant="outline-primary"
                        onClick={() => handleSort("id")}
                        className="flex! gap-1"
                    >
                        #{" "}
                        {props.sort === "id"
                            ? props.order === "DESC"
                                ? "desc"
                                : "asc"
                            : null}
                    </Button>
                </Col>
                <Col>Car</Col>
                <Col>Name</Col>
                <Col>
                    <Button
                        variant="outline-primary"
                        onClick={() => handleSort("wins")}
                    >
                        Wins{" "}
                        {props.sort === "wins"
                            ? props.order === "DESC"
                                ? "desc"
                                : "asc"
                            : null}
                    </Button>
                </Col>
                <Col>
                    <Button
                        variant="outline-primary"
                        onClick={() => handleSort("time")}
                    >
                        Time{" "}
                        {props.sort === "time"
                            ? props.order === "DESC"
                                ? "desc"
                                : "asc"
                            : null}
                    </Button>
                </Col>
            </Row>
            {props.winners.length > 0 ? (
                props.winners.map((winner) => {
                    return (
                        <Row
                            className="sm:py-3 py-1 sm:text-xl items-center"
                            key={winner.id}
                        >
                            <Col>{winner.id}</Col>
                            <Col>
                                <Car
                                    color={winner.color}
                                    className="size-10!"
                                />
                            </Col>
                            <Col>{winner.name}</Col>
                            <Col>{winner.wins}</Col>
                            <Col>{winner.time}</Col>
                        </Row>
                    )
                })
            ) : (
                <Row className="justify-center text-2xl">No winners</Row>
            )}
        </Container>
    )
}
