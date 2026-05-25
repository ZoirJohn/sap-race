import { Button, FormControl, InputGroup, Row, Stack } from "react-bootstrap"
import { Form } from "react-router"

export default function UpdateForm() {
    return (
        <Form>
            <Stack direction="horizontal" gap={1}>
                <InputGroup className="max-w-20">
                    <FormControl type="color" className="grow-0"></FormControl>
                </InputGroup>

                <InputGroup className="max-w-30">
                    <FormControl
                        type="number"
                        className="grow-0"
                        placeholder="ID"
                    ></FormControl>
                </InputGroup>

                <Button variant="secondary">UPDATE</Button>
            </Stack>
        </Form>
    )
}
