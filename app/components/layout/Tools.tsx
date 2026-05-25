import { Button, FormControl, InputGroup, Row, Stack } from "react-bootstrap"

export default function Tools() {
    return (
        <Stack direction="horizontal">
            <Button>CREATE</Button>
            <InputGroup className="grow-0">
                <FormControl type="color" className="grow-0"></FormControl>
            </InputGroup>
            <Button variant="secondary">UPDATE</Button>
        </Stack>
    )
}
