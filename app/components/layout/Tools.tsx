import { Stack } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import CreateForm from "./CreateForm"

export default function Tools() {
    return (
        <Stack
            className="top-0 sticky md:flex-row! justify-between py-1 md:py-4"
            gap={2}
        >
            <CreateForm />
            <UpdateForm />
        </Stack>
    )
}
