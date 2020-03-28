import React, { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../App.css';

export default function Teachers() {

      // Show/hide editing fields
    const [checked, setChecked] = React.useState(true);
    const handleChange = () => {
        setChecked(prev => !prev);
    }; 
    const [stateCustomers, setState] = React.useState([]);
    const [customer, setCustomer] = React.useState({
        firstName: '', lastName: '', tel: '', email: ''
    });
    const [newCustomer, setNewCustomer] = React.useState({
        firstName: '', lastName: '', tel: '', email: ''
    });  
/*      const updateRow = (row) => {
        setCustomer({firstName: row.firstName, lastName: row.lastName, tel: row.tel, email: row.email});
        console.log(customer);
    }; */
    const handleInputChange = (event) => {
        setNewCustomer({...customer, [event.target.name]: event.target.value})
        console.log(event);
    } 
    useEffect( () => fetchData(), []);

    function headerFormatter(column, colIndex, { sortElement, filterElement }) {
        return (
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            { filterElement }
           
            { column.text }
          </div>
        );
      } 
    const fetchData = () => {
        console.log("start fetch");
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
        }
    };
     const updateCustomer = (customer) => {
        console.log("Start update (put)");
        fetch(customer.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.log(err))
    }
    const addCustomer = (newCustomer) => {  
        fetch('http://localhost:8080/api/customers', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(newCustomer)
         })
         .then(res => fetchData())
         .catch(err => console.log(err))
 };

    const columns = [{
        dataField: 'customerId', 
        text: 'rowID',
        hidden: false
        }, {
        dataField: 'firstName',
        text: 'First name',
        headerFormatter: headerFormatter,
        filter: textFilter(),
        sort: true
        }, {
        dataField: 'lastName',
        text: 'Last name',
        headerFormatter: headerFormatter,
        filter: textFilter(),
        sort: true
        }, {
        dataField: 'tel',
        text: 'Tel. number',
        sort: true
        }, {
        dataField: 'email',
        text: 'Email',
        sort: true
        },
      {
            dataField: 'links[0].href',
            text: "",
            headerClasses: 'deleteCol',
            editable: false,
            formatter: (cell, row) => {
              if (row)
                return (
                    <IconButton aria-label="delete" onClick={() => {deleteCustomer(row.links[0].href)}} >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                );
              return null;
            }
          }
        ];
      

    
    return (
        <div>
            <div className="SectionHeader">
                <h1 className="SectionHeaderTitle">Teachers</h1>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleChange} />}
                    label="Show" className="SlideControl"
                />
            </div>
            <div className="FormContainer">
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




            </div>
            <div className="TableContainer">
                <BootstrapTable keyField='links[0].href'
                data={ stateCustomers } columns={ columns }  // data stateCustomers
                headerClasses="header-class" striped hover 
                filter={ filterFactory() } bordered={ true } condensed
                
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => { updateCustomer(row); }
                }) } />
            </div>
        </div>
    )
}

