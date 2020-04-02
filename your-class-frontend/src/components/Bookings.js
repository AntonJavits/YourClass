import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Calendar, Views, Navigate, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';


import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import Moment from 'react-moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash, PersonPlus } from 'react-bootstrap-icons';
import '../App.css';

export default function Bookings() {

  const localizer = momentLocalizer(moment);

  let date1 = new Date();
  console.log("first date:" + date1);

  const dateToFormat = '1976-04-19T12:59-0500';
        

  // State of values for select
  const [stateTeachers, setStateTeachers] = React.useState([]);

  // State of values in table
  const [stateClassRecords, setState] = React.useState([]);

  useEffect( () => fetchDataTeachers(), []);
  useEffect( () => fetchData(), []);



  const [newClassRecord, setClassRecord] = React.useState({'name':'','startDateTime':'','duration':'', 'teacher':''}); 
  
  function checkIsValid(obj) {
    for (var key in obj) {
        if (obj[key] === null || obj[key] === "")
            return false;
    }
    return true;
}
console.log("Validate:" + checkIsValid(newClassRecord));

  function headerFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        { filterElement }
        { column.text }
      </div>
    );
  } 

 

  const fetchDataTeachers = () => {
    console.log("start fetch teachers");
    fetch('http://localhost:8080/api/teachers') 
    .then(response => response.json())
    .then(data => { 
        setStateTeachers(data.content);
    } )
    .catch(err => console.log(err))
  };

  const fetchData = () => {
    console.log("start fetch");
    fetch('http://localhost:8080/api/classRecords')
    .then(response => response.json())
    .then(data => { 
        setState(data.content);
        console.log(data);
        console.log("DATETIME"); 
        console.log(data.content[0].startDateTime);
        console.log("DATETIME2"); 
        console.log(stateClassRecords);  
    } )
    .catch(err => console.log(err))
  };
  


  const deleteClassRecord = (link) => {
    if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
  };
const updateClassRecord = (row) => {
  console.log("Start update (put)");
  fetch(row.links[0].href, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
  })
  .then(res => fetchData())
}

// Input change in edit form fields
const handleInputChangeSelect = (link) => {
  if (link !== null) {
  setClassRecord({...newClassRecord, 'teacher': link.links[0].href});
  } else {
    setClassRecord({...newClassRecord, 'teacher': ''});
  }
}
const handleInputChange = (event) => {
  setClassRecord({...newClassRecord, [event.target.name]: event.target.value});
}

const addClassRecord = () => {
  if ( checkIsValid(newClassRecord) ) {
  fetch('http://localhost:8080/api/classRecords', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClassRecord)
  })
  .then(res => fetchData())
  .catch(err => console.log(err))
  } else {
    console.log("All fields are required to fill!");
  }
};

  const columns = [{
    dataField: 'name', 
    text: 'Class name',
    hidden: false
    }, {
    dataField: 'startDateTime',
    text: 'Date and time',
    headerFormatter: headerFormatter,
    filter: textFilter(),
    sort: true
    }, {
    dataField: 'teacherFullName',
    text: 'Teacher',
    headerFormatter: headerFormatter,
    filter: textFilter(),
    sort: true
    }, {
    dataField: 'duration',
    text: 'Duration',
    sort: true
    }, {
    dataField: 'links[0].href',
    text: "",
    headerClasses: 'deleteColHeader',
    classes: 'deleteCol',
    editable: false,
    align: (cell, row, rowIndex, colIndex) => {
      return 'right';
    },
    formatter: (cell, row) => {
      if (row)
        return (
          
            <button className="btn btn-circle" aria-label="delete" onClick={() => {deleteClassRecord(row.links[0].href)}} >
                <Trash fontSize="inherit" className="DeleteIcon" />
            </button>
        );
      return null;
        }
      }
    ];
   
  return (
    <>

    <Container fluid-lg className="BodyContainer">
    <div className="SectionHeader">
                <h1 className="SectionHeaderTitle">Manage Classes</h1>
        </div>
      <Row className="AddFormContainer">
      <div className="FieldsContainer">
      <form className="EditForm" noValidate autoComplete="off">
                <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        name="name"
                        value={newClassRecord.name} 
                        label="Class name"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="startDateTime"
                        variant="outlined"
                        name="startDateTime"
                        value={newClassRecord.startDateTime} 
                        label="StartDateTime"
                        onChange = {e => handleInputChange(e) }
                    />
                     <TextField
                        margin="normal"
                        variant="outlined"
                        name="duration"
                        value={newClassRecord.duration} 
                        label="Duration"
                        onChange = {e => handleInputChange(e) }
                    />
                     <Autocomplete
                        id="select"
                        options={stateTeachers}
                        getOptionLabel={(option) => (option.firstName + " " + option.lastName)}
                        onChange={(event, value) => handleInputChangeSelect(value)}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" />}
                        />
                        <Button onClick={addClassRecord}
                        color="primary" variant="contained" size="large"
                        className="FormButton"
                        startIcon={<PersonPlus />}>
                            Add Customer
                        </Button>   
                  </form>   
                </div>
      </Row>

    
      <Row className="TableContainer">
          <BootstrapTable keyField='links[0].href'
            data={ stateClassRecords } columns={ columns }  // data stateCustomers
            headerClasses="header-class"  bootstrap4 striped hover
            filter={ filterFactory() } bordered={ false } 
            
            cellEdit={ cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => { updateClassRecord(row); }
            }) }
          />
      
      </Row>
      <Row className="CalendarRow">
      <Calendar
        localizer={localizer}
        events={stateClassRecords}
        titleAccessor="name"
        startAccessor="startDateTime"
       
        defaultView={Views.month}
        views={{ month: true, week: true, day: true }}

        defaultDate={new Date(2020, 2, 1)}

        

      />


      </Row>
      <Moment>{date1}</Moment>
      <br/>
      <Moment date={dateToFormat} />
      <br/>
      <Moment add={{ hours: 1 }}>{dateToFormat}</Moment>

    </Container>
     </>
  );
}
























      

