import type { Movement } from "~/type"

export default function findOutWinner(movements: Movement[]) {
    const data = [...movements]
    data.sort((movement1, movement2) => movement2.velocity - movement1.velocity)
    return data[0]
}
