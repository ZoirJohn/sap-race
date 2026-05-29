import type { Movement, Racer } from "~/type"

export default function findWinnerCar(id: number, racers: Racer[]) {
    return racers.find((racer) => racer.id === id)
}
