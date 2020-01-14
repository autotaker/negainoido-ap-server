import React from 'react';

import { Link } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'

const Navigator : React.FC = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">negainoido</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to='/icfpc2019'>ICFPC2019</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigator

