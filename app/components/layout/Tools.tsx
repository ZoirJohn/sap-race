import { Stack } from "react-bootstrap"
import UpdateForm from "./UpdateForm"
import CreateForm from "./CreateForm"

export default function Tools() {
    return (
        <Stack direction="horizontal" className="py-4">
            <CreateForm />
            <UpdateForm />
        </Stack>
    )
}
