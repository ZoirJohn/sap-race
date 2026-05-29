import { Button, Stack } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import CreateForm from "./CreateForm"
import Key from "../ui/Key"
import Stop from "../ui/Stop"
import { useState, type Dispatch, type SetStateAction } from "react"

export default function Tools(props: {
    selected: number | undefined
    disableAll: () => void
    unDisableAll: () => void
    startAllEngines: () => void
    stopAllEngines: () => void
}) {
    const [disabled, setDisabled] = useState(false)
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
                    onClick={() => {
                        props.startAllEngines()
                        setDisabled(true)
                    }}
                    disabled={disabled}
                >
                    <Key />
                </Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        props.stopAllEngines()
                        setDisabled(false)
                    }}
                >
                    <Stop />
                </Button>
            </div>
            <UpdateForm selected={props.selected} />
        </Stack>
    )
}
