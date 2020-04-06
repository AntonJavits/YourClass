import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


export default function Navigation() {
    return (
        <>
        <Navbar expand="lg">

                <Navbar.Brand as={NavLink} to="/" activeClassName="active">YourClass</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav className="mr-auto">
                    <NavLink to="/bookings" activeClassName="active">Bookings</NavLink>
                   
                    <NavLink  to="/customers" activeClassName="active">Customers</NavLink>
             
                    <NavLink  to="/classes" activeClassName="active">Classes</NavLink>
               
                    <NavLink  to="/teachers" activeClassName="active">Teachers</NavLink>

                    <NavLink  to="/reports" activeClassName="active">Reports</NavLink>
               
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>

            


            </>
    )
}