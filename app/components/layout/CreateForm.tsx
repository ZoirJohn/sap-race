import { Button, FormControl, InputGroup, Row, Stack } from "react-bootstrap"
import { Form } from "react-router"

export default function CreateForm() {
    return (
        <Form>
            <Stack direction="horizontal" gap={1}>
                <InputGroup className="max-w-20">
                    <FormControl type="color" className="grow-0"></FormControl>
                </InputGroup>
                <InputGroup className="max-w-80">
                    <FormControl
                        type="text"
                        className="grow-0"
                        placeholder="Name"
                    ></FormControl>
                </InputGroup>
                <Button>CREATE</Button>
            </Stack>
        </Form>
    )
}
