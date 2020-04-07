import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash, PersonPlus } from 'react-bootstrap-icons';
import '../App.css';

export default function Customers() {

  // State of values in table
  const [stateCustomers, setState] = React.useState([]);
  
  // Edit form fields
  const [newCustomer, setCustomer] = React.useState({'firstName':'','lastName':'','tel':'','email':''}); 
  
  useEffect( () => fetchData(), []);

  function checkIsValid(obj) {
    for (var key in obj) {
        if (obj[key] === null || obj[key] === "")
            return false;
    }
    return true;
  }

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
    fetch('https://yourclass.javits.fi/api/customers')
    .then(response => response.json())
    .then(data => { 
        setState(data.content);
        console.log(data); 
        console.log(data.content[0].links[0].href); 
    } )
    .catch(err => console.log(err))
  };
  const deleteCustomer = (link) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
    
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
      }
    })
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
  if ( checkIsValid(newCustomer) ) {
  fetch('https://yourclass.javits.fi/api/customers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
  })
  .then(res => fetchData())
  .catch(err => console.log(err))
  } else {
    Swal.fire({         
      icon: 'error',
      title: "Can't add new booking!",
      text: 'Check that all fields are filled.'       
    })
  }
};

  const columns = [{
    dataField: 'customerId', 
    text: 'rowID',
    hidden: true
    }, {
    dataField: 'firstName',
    text: 'First name',
    headerFormatter: headerFormatter,
    classes: 'editableCol',
    filter: textFilter(),
    sort: true
    }, {
    dataField: 'lastName',
    text: 'Last name',
    headerFormatter: headerFormatter,
    classes: 'editableCol',
    filter: textFilter(),
    sort: true
    }, {
    dataField: 'tel',
    text: 'Tel. number',
    classes: 'editableCol',
    sort: true
    }, {
    dataField: 'email',
    text: 'Email',
    headerClasses: 'emailColHeader',
    classes: 'editableCol',
    sort: true
    }, {
    dataField: 'links[0].href',
    text: "",
    headerClasses: 'deleteColHeader',
    classes: 'deleteCol',
    editable: false,
    align: (cell, row, rowIndex, colIndex) => {
      return 'center';
    },
    formatter: (cell, row) => {
      if (row)
        return (
          
            <button className="btn btn-circle" aria-label="delete" onClick={() => {deleteCustomer(row.links[0].href)}} >
                <Trash fontSize="inherit" className="DeleteIcon" />
            </button>
        );
      return null;
        }
      }
    ];

  return (
    <>
   <Container fluid={"xl"} className="BodyContainer">
      <Row>
        <Col className="SectionHeader">
          <h1 className="SectionHeaderTitle">Customers management</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="AddFormContainer">
          <form className="EditForm" noValidate autoComplete="off">
                <TextField
                        autoFocus
                        margin="normal"
                        variant="filled"
                        name="firstName"
                        value={newCustomer.firstName} 
                        label="First Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="filled"
                        name="lastName"
                        value={newCustomer.lastName} 
                        label="Last Name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="filled"
                        name="tel"
                        type="number"
                        value={newCustomer.tel} 
                        label="Tel. number"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="filled"
                        name="email"
                        value={newCustomer.email} 
                        label="Email"
                        onChange = {e => handleInputChange(e) }
                    />
                        <div className="ButtonContainer">
                        <Button onClick={addCustomer}
                        color="primary" variant="contained" size="large"
                        className="FormButton"
                        startIcon={<PersonPlus />}>
                            Add Customer
                        </Button>
                         </div>  
                  </form>   
              </Col>
      </Row>

      <Row className="TableContainer">
          <BootstrapTable keyField='links[0].href'
            data={ stateCustomers } columns={ columns }  // data stateCustomers
            headerClasses="header-class"  bootstrap4 striped hover condensed
            filter={ filterFactory() } bordered={ false } 
            
            cellEdit={ cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => { updateCustomer(row); }
            }) }
          />
      </Row>
    
    </Container>
     </>
  );
}


