import React from 'react'
import {  Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to={`/`}>Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={`/formAnimal/${'false'}`}>Insertar animal</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={`/formRivia/${'false'}`}>Insertar Registre Rivia</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}


export default Header