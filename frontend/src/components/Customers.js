import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import '../App.css';

export default function Customers() {

    // Show/hide editing fields
    const [checked, setChecked] = React.useState(true);
    const handleChange = () => {
        setChecked(prev => !prev);
    };
    
    const [customer, setCustomer] = React.useState({
        firstName: '', lastName: '', tel: '', email: ''
    }); 


    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    
    const addCustomer = () => {
        saveCustomer(customer);
    }

    const [stateCustomers, setState] = React.useState([]);
    useEffect( () => fetchData(), []);

    const fetchData = () => {
        fetch('http://localhost:8080/api/customers')
        .then(response => response.json())
        .then(data => { 
            setState(data.content);
            console.log(data); 
            console.log(data.content[0].links[0].href); 
        } )
        .catch(err => console.log(err))
    };
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
           // setOpen(true);
        }
    };
    const saveCustomer = (customer) => {
        fetch('http://localhost:8080/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.log(err))
    };

    const columns = [
        {
            Header: 'First name',
            accessor: 'firstName'
        },
        {
            Header: 'Last name',
            accessor: 'lastName'
        },
        {
            Header: 'Tel',
            accessor: 'tel'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            sortable: false,
            filterable: false,
            width: 90,
            accessor: 'links[0].href',
            Cell: row => 
            <IconButton aria-label="delete"  onClick={() => deleteCustomer(row.value)} size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        },
  
    ];

    return (
        <div>
            <div className="SectionHeader">
                <h1 className="SectionHeaderTitle">Customers</h1>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show" className="SlideControl"
                />
            </div>

            <div className="TableContainer">
            <Collapse in={checked}>
                <div className="FieldsContainer"> 
                <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        name="firstName"
                        value={customer.firstName} 
                        label="First Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="lastName"
                        value={customer.lastName} 
                        label="Last Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="tel"
                        value={customer.tel} 
                        label="Tel. number"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="email"
                        value={customer.email} 
                        label="Email"
                        onChange = {e => handleInputChange(e) }
                    />
                
                   
                    
                        <Button onClick={addCustomer} color="primary" variant="contained">
                            Add
                        </Button>      
                </div>
            </Collapse>
            
            <ReactTable filterable={true} data={stateCustomers} columns={columns}
                className="-striped -highlight"
                style={{
                    height: "600px" // Force the table body to overflow and scroll, since there is not enough room
                  }}
            />
        </div>
        </div>
    );
}