import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash, FilePlus } from 'react-bootstrap-icons';
import '../App.css';

export default function Classes() {

  // State of values for select
  const [stateTeachers, setStateTeachers] = React.useState([]);

  // State of values in table
  const [stateClassRecords, setState] = React.useState([]);

  useEffect( () => fetchDataTeachers(), []);
  useEffect( () => fetchData(), []);

  const [newClassRecord, setClassRecord] = React.useState({'name':'','startDateTime': new Date('April 1, 2020 17:00:00'),'duration':'', 'teacher':''}); 
  const MySwal = withReactContent(Swal);

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
    fetch('https://yourclass.javits.fi/api/teachers') 
    .then(response => response.json())
    .then(data => { 
        setStateTeachers(data.content);
    } )
    .catch(err => console.log(err))
  };

  const fetchData = () => {
    console.log("start fetch");
    fetch('https://yourclass.javits.fi/api/classRecords')
    .then(response => response.json())
    .then(data => { 
        setState(data.content);
        console.log(data); 
        console.log(data.content[0].links[0].href); 
    } )
    .catch(err => console.log(err))
  };
  const deleteClassRecord = (link) => {

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
        .then(res => {
          if(res.status===409){   
            MySwal.fire({         
              icon: 'error',
              title: "Can't delete this!",
              text: 'There are customers attending this class, bookings should be removed first.'    
            })
          }
            fetchData();
        })
        .catch(err => {
          console.error(err);   
        })
      }
    })    
    
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

const handleSelectDate = (value) => {
  if (value !== null) {
    // const dateStr = ( moment(value).format('DD-MM-YYYY') );
    setClassRecord({...newClassRecord, 'startDateTime': value});
    console.log(newClassRecord);
  } else {
    setClassRecord({...newClassRecord, 'startDateTime': ''});
  }
}

const handleInputChange = (event) => {
  setClassRecord({...newClassRecord, [event.target.name]: event.target.value});
}

const addClassRecord = () => {
  if ( checkIsValid(newClassRecord) ) {
  fetch('https://yourclass.javits.fi/api/classRecords', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClassRecord)
  })
  .then(res => fetchData())
  .catch(err => console.log(err))
  } else {
    Swal.fire({         
      icon: 'error',
      title: "Can't add class record!",
      text: 'All fields are required to fill.'       
    })
 
  }
};

  const columns = [{
    dataField: 'name', 
    text: 'Class name',
    classes: 'editableCol',
    hidden: false
    }, {
    dataField: 'startDateTimePretty',
    text: 'Date and time',
    headerFormatter: headerFormatter,
    filter: textFilter(),
    editable: false,
    sort: true
    }, {
    dataField: 'teacherFullName',
    text: 'Teacher',
    headerFormatter: headerFormatter,
    filter: textFilter(),
    editable: false,
    sort: true
    }, {
    dataField: 'duration',
    text: 'Duration',
    classes: 'editableCol',
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

    <Container fluid={"xl"} className="BodyContainer">
      <Row>
        <Col className="SectionHeader">
          <h1 className="SectionHeaderTitle">Class records management</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="AddFormContainer">
          <form className="EditForm" noValidate autoComplete="off">
                <TextField
                        autoFocus
                        margin="normal"
                        variant="filled"
                        name="name"
                        value={newClassRecord.name} 
                        label="Class name"
                        onChange = {e => handleInputChange(e) }
                    />
                   
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                   
                        <DateTimePicker
                          label="Date and time"
                          inputVariant="filled"
                          value={newClassRecord.startDateTime}
                          onChange={value => handleSelectDate(value)}
                        />
                     </MuiPickersUtilsProvider>
                    
                     <TextField
                        margin="normal"
                        variant="filled"
                        name="duration"
                        type="number"
                        className="NarrowInput"
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
                        renderInput={(params) => <TextField {...params} label="Teacher" variant="filled" />}
                        />
                        <div className="ButtonContainer">
                        <Button onClick={addClassRecord}
                        color="primary" variant="contained" size="large"
                        className="FormButton"
                        startIcon={<FilePlus />}>
                            Add Class
                        </Button>  
                        </div> 
                  </form>   
            </Col>
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
    </Container>
     </>
  );
}


