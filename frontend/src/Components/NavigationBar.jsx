import { useContext, useState } from 'react';
import { Navbar, Nav, Collapse, NavItem, NavLink, NavbarBrand, NavbarToggler, NavbarText } from 'reactstrap';
import { CartContext } from '../Context/CartContext';
const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {itemCount} = useContext(CartContext);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Simple Payment System</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/savannahvaith/MERN-Stripe">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <NavLink href="/Basket"> Cart ({itemCount})</NavLink>
                    <NavbarText>Savannah Vaithilingam</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}
export default NavigationBar; 