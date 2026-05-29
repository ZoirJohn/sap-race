import {
    Container,
    NavLink as Link,
    Navbar,
    Nav,
    NavbarBrand,
} from "react-bootstrap"
import { NavLink } from "react-router"
import { links } from "~/links"

export default function Header() {
    return (
        <Navbar bg="light" data-bs-theme="white">
            <Container className="justify-between">
                <NavbarBrand to="/" as={NavLink}>
                    Racing
                </NavbarBrand>
                <Nav className="ml-auto">
                    {links.map((link, idx) => {
                        return (
                            <Link
                                to={link.to}
                                as={NavLink}
                                className={""}
                                key={link.name + link.to}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </Nav>
            </Container>
        </Navbar>
    )
}
