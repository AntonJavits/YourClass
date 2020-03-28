import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash } from 'react-bootstrap-icons';
import './App.css';

function App() {

  // State of values in table
  const [stateCustomers, setState] = React.useState([]);
  
  // Edit form fields
  const [newCustomer, setCustomer] = React.useState({'firstName':'','lastName':'','tel':'','email':''}); 
  
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
const updateCustomer = (row) => {
  console.log("Start update (put)");
  fetch(row.links[0].href, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
  })
  .then(res => fetchData())
  .catch(err => console.log(err))
}

// Input change in edit form fields
const handleInputChange = (event) => {
  setCustomer({...newCustomer, [event.target.name]: event.target.value});
  console.log(event);
  console.log(newCustomer);
}

const addCustomer = () => {
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
    }, {
    dataField: 'links[0].href',
    text: "",
    headerClasses: 'deleteCol',
    editable: false,
    formatter: (cell, row) => {
      if (row)
        return (
          
            <button className="btn" aria-label="delete" onClick={() => {deleteCustomer(row.links[0].href)}} >
                <Trash fontSize="inherit" />
            </button>
        );
      return null;
        }
      }
    ];

  
  return (
    <div className="BodyContainer">
      <div className="AddFormContainer">
      <div className="FieldsContainer"> 
      <form className="EditForm" noValidate autoComplete="off">
                <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        name="firstName"
                        value={newCustomer.firstName} 
                        label="First Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="lastName"
                        value={newCustomer.lastName} 
                        label="Last Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="tel"
                        value={newCustomer.tel} 
                        label="Tel. number"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="email"
                        value={newCustomer.email} 
                        label="Email"
                        onChange = {e => handleInputChange(e) }
                    />
                        <Button onClick={addCustomer} color="primary" variant="contained">
                            Add
                        </Button>   
                  </form>   
                </div>



      </div>

    
      <div className="TableContainer">
          <BootstrapTable keyField='links[0].href'
            data={ stateCustomers } columns={ columns }  // data stateCustomers
            headerClasses="header-class" striped hover bootstrap4
            filter={ filterFactory() } bordered={ true } condensed
            
            cellEdit={ cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => { updateCustomer(row); }
            }) }
          />
      </div>


    </div>
     
  );
}

export default App;
