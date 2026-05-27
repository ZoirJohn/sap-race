import { Button, Stack } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import CreateForm from "./CreateForm"
import { useDispatch } from "react-redux"
import type { RacersStoreDispatch } from "~/type"
import { fetchAllMovements, fetchMovement } from "~/api/client"
import Key from "../ui/Key"
import Stop from "../ui/Stop"

export default function Tools(props: { selected: number | undefined }) {
    const dispatch = useDispatch<RacersStoreDispatch>()
    function startAllEngines() {
        dispatch(fetchAllMovements())
    }
    return (
        <Stack
            className="top-0 sticky md:flex-row! justify-between py-1 md:py-4"
            gap={2}
        >
            <CreateForm />
            <div className="flex flex-wrap gap-2 max-w-31">
                <Button
                    variant="light"
                    className="flex justify-center items-center"
                    onClick={() => startAllEngines()}
                >
                    <Key />
                </Button>
                <Button variant="warning">
                    <Stop />
                </Button>
            </div>
            <UpdateForm selected={props.selected} />
        </Stack>
    )
}
