import React, {useState} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import Link from "next/link";
import useAuth from '../hooks/useAuth'
export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const {logOut} = useAuth();
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div style={{marginBottom: 20}}> 
                <Navbar color="light" light expand="md" >
                    
                    <NavbarBrand>
                        PetMap
                    </NavbarBrand>
                    
                    <NavbarToggler onClick={toggle} />
                    <Collapse className="float-left" isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link href="/dashboard">
                                    <NavLink>Tus Mascotas</NavLink>
                                </Link>
                                </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Opciones
                                </DropdownToggle>
                                <DropdownMenu right>
                                    
                                    <DropdownItem divider />
                                    <DropdownItem onClick={()=> logOut()}>
                                        Cerrar session
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                
            </div>
            <Container>
            {children}
            </Container>
            
        </>
    )
}
