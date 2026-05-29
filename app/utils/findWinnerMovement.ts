import type { Movement } from "~/type"

export default function findOutWinner(movements: Movement[]) {
    const data = [...movements]
    data.sort((mov1, mov2) => mov2.velocity - mov1.velocity)
    return data[0]
}
