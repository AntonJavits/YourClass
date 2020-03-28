import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Navigation() {
    return (
        <nav className="navbar">
            <h3 className="App-logo">YourClass</h3>
            <ul>
                <li>
                    <NavLink to="/" className="nav-link" activeClassName="selected">Book</NavLink>
                </li>
                <li>
                    <NavLink to="/customers" className="nav-link" activeClassName="selected">Customers</NavLink>
                </li>
                <li>
                    <NavLink to="/classes" className="nav-link" activeClassName="selected">Classes</NavLink>
                </li>
                <li>
                    <NavLink to="/teachers" className="nav-link" activeClassName="selected">Teachers</NavLink>
                </li>
                <li>
                    <NavLink to="/reports" className="nav-link" activeClassName="selected">Reports</NavLink>
                </li>
            </ul>
        
        </nav>
    )
}