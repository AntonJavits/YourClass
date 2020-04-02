import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Trash, PersonPlus } from 'react-bootstrap-icons';




export default function AddCustomer(props) {
    // Edit form fields
  const [newCustomer, setCustomer] = React.useState({'firstName':'','lastName':'','tel':'','email':''}); 

// Input change in edit form fields
const handleInputChange = (event) => {
    setCustomer({...newCustomer, [event.target.name]: event.target.value});
    console.log(event);
    console.log(newCustomer);
  }

  const addNew = () => {
    props.addCustomer();
}

  return (
    
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
                        <Button onClick={addNew()}
                        color="primary" variant="contained" size="large"
                        className="FormButton"
                        startIcon={<PersonPlus />}>
                            Add Customer
                        </Button>   
                  </form>   
    </div>
            



  )
}