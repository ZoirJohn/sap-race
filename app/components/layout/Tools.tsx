import { Button, Stack } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import CreateForm from "./CreateForm"
import { useDispatch } from "react-redux"
import type { RacersStoreDispatch } from "~/type"
import {
    deleteAllMovements,
    fetchAllMovements,
    fetchMovement,
} from "~/api/client"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import { useState, type Dispatch, type SetStateAction } from "react"

export default function Tools(props: {
    selected: number | undefined
    disableAll: () => void
    unDisableAll: () => void
}) {
    const [disabled, setDisabled] = useState(false)

    const dispatch = useDispatch<RacersStoreDispatch>()

    function startAllEngines() {
        setDisabled(true)
        props.disableAll()
        dispatch(fetchAllMovements())
    }
    function stopAllEngines() {
        setDisabled(false)
        props.unDisableAll()
        dispatch(deleteAllMovements())
    }
    return (
        <Stack
            className="top-0 sticky md:flex-row! justify-between py-1 md:py-4! z-2"
            gap={2}
        >
            <CreateForm />
            <div className="flex flex-wrap gap-2 max-w-31">
                <Button
                    variant="light"
                    className="flex justify-center items-center"
                    onClick={startAllEngines}
                    disabled={disabled}
                >
                    <Key />
                </Button>
                <Button variant="warning" onClick={stopAllEngines}>
                    <Stop />
                </Button>
            </div>
            <UpdateForm selected={props.selected} />
        </Stack>
    )
}
