import { useRef } from "react"
import { Button, FormControl, InputGroup, Row, Stack } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Form } from "react-router"
import { updateCar } from "~/api/client"
import type { RacersStoreDispatch } from "~/type"

export default function UpdateForm(props: { selected: number | undefined }) {
    const dispatch = useDispatch<RacersStoreDispatch>()
    const colorField = useRef<HTMLInputElement>(null)
    const nameField = useRef<HTMLInputElement>(null)
    function changeCar() {
        if (
            props.selected &&
            nameField.current?.value &&
            colorField.current?.value
        ) {
            dispatch(
                updateCar(
                    props.selected,
                    nameField.current?.value,
                    colorField.current?.value,
                ),
            )
        }
    }
    return (
        <Form>
            <Stack direction="horizontal" gap={1}>
                <InputGroup className="max-w-20">
                    <FormControl
                        type="color"
                        className="grow-0"
                        ref={colorField}
                    ></FormControl>
                </InputGroup>

                <InputGroup className="max-w-80">
                    <FormControl
                        type="text"
                        className="grow-0"
                        placeholder="Name"
                        ref={nameField}
                    ></FormControl>
                </InputGroup>

                <Button variant="secondary" onClick={changeCar}>
                    UPDATE
                </Button>
            </Stack>
        </Form>
    )
}
