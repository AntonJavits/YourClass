import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash, ChevronDown, CheckCircle } from 'react-bootstrap-icons';
import '../App.css';

export default function Bookings() {

  console.log("0.2");

  // State of values for select (customers)
  const [stateCustomers, setStateCustomers] = React.useState([]);

  // State of values for select (classes)
  const [stateClassRecords, setStateClassRecords] = React.useState([]);

  // State of values in table (attendees)
  const [stateAttendees, setStateAttendees] = React.useState([]);

  // State of values for calendar (events generated from classes)
  const [stateEvents, setStateEvents] = React.useState([]);

  useEffect( () => fetchDataCustomers(), []);
  useEffect( () => fetchDataClassRecords(), []);
  useEffect( () => fetchDataAttendees(), []);

  const localizer = momentLocalizer(moment);

  const [newAttendeeRecord, setAttendeeRecord] = React.useState({
    'bookingDateTime': (new Date()).toISOString().split('.')[0],
    'customer':'',
    'classRecord':'',
    'paymentMethod':'Credit Card',
    'paymentAmmount':'14'}); 

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

  const fetchDataAttendees = () => {
    fetch('https://yourclass.javits.fi/api/attendees') 
    .then(response => response.json())
    .then(data => { 
        setStateAttendees(data.content);
    } )
    .catch(err => console.log(err))
  };

  const fetchDataCustomers = () => {
    fetch('https://yourclass.javits.fi/api/customers')
    .then(response => response.json())
    .then(data => { 
        setStateCustomers(data.content);
    } )
    .catch(err => console.log(err))
  };

  const myEvents = [];

  const fetchDataClassRecords = () => {
    fetch('https://yourclass.javits.fi/api/classRecords')
    .then(response => response.json())
    .then(data => { 

      setStateClassRecords(data.content);

            for (let i=0; i<data.content.length; i++) {
              myEvents.push({ 'title' : data.content[i].name,
                              'start' : new Date(data.content[i].startDateTime),
                              'end' :  new Date(data.content[i].endDateTime) });
            };
            setStateEvents(myEvents);
    } )
    .catch(err => console.log(err))
  };
  
  const deleteAttendee = (link) => {
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
        .then(res => fetchDataAttendees())
        .catch(err => console.error(err))
      }
    })
  };

  const updateAttendee = (row) => {
  fetch(row.links[0].href, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
  })
  .then(res => fetchDataAttendees())
}

// Input change in edit form fields
const handleInputChangeSelectCustomer = (link) => {
  if (link !== null) {
  setAttendeeRecord({...newAttendeeRecord, 'customer': link.links[0].href});
  console.log("Customer selected: " + link.links[0].href);
  } else {
    setAttendeeRecord({...newAttendeeRecord, 'customer': ''});
  }
}
const handleInputChangeSelectClass = (link) => {
  if (link !== null) {
  setAttendeeRecord({...newAttendeeRecord, 'classRecord': link.links[0].href});
  console.log("Class selected: " + link.links[0].href);
  } else {
    setAttendeeRecord({...newAttendeeRecord, 'attendee': ''});
  }
}
/* To use with payment info fields 
  const handleInputChange = (event) => {
  setAttendeeRecord({...newAttendeeRecord, [event.target.name]: event.target.value});
} */

const addAttendeeRecord = () => {
  if ( checkIsValid(newAttendeeRecord) ) {
  fetch('https://yourclass.javits.fi/api/attendees', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAttendeeRecord)
  })
  .then(res => fetchDataAttendees())
  .catch(err => console.log(err))
  } else {
    Swal.fire({         
      icon: 'error',
      title: "Can't add new booking!",
      text: 'Check that fields customer and class are not empty.'       
    })
  }
};

  const columns = [{
    dataField: 'bookingDate', 
    text: 'Date',
    headerClasses: 'dateColHeader',
    hidden: false,
    sort: true
    }, {
    dataField: 'customerFullName',
    text: 'Customer',
    headerFormatter: headerFormatter,
    filter: textFilter(),
    editable: false,
    sort: true
    }, {
    dataField: 'classRecordInfo',
    text: 'Class',
    headerFormatter: headerFormatter,
    headerClasses: 'classColHeader',
    filter: textFilter(),
    editable: false,
    sort: true
    }, {
    dataField: 'paymentMethod',
    text: 'Payment Method',
    classes: 'editableCol',
    sort: true
    }, {
    dataField: 'paymentAmmount',
    text: 'Price',
    headerClasses: 'priceColHeader',
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
          
            <button className="btn btn-circle" aria-label="delete" onClick={() => {deleteAttendee(row.links[0].href)}} >
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
          <h1 className="SectionHeaderTitle">Bookings management</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="AddFormContainer">
          <form className="EditForm" noValidate autoComplete="off">

{/*           // Save payment information   
              <TextField
                margin="paymentMethod"
                variant="filled"
                name="startDateTime"
                value={newAttendeeRecord.paymentMethod} 
                label="StartDateTime"
                onChange = {e => handleInputChange(e) }
              />
              <TextField
                margin="normal"
                variant="filled"
                name="Ammount"
                value={newAttendeeRecord.paymentAmmount} 
                label="Duration"
                onChange = {e => handleInputChange(e) }
              /> */}
              <Autocomplete
                id="selectCustomer"
                options={stateCustomers}
                getOptionLabel={(option) => (option.firstName + " " + option.lastName)}
                onChange={(event, value) => handleInputChangeSelectCustomer(value)}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Customer:" variant="filled" />}
              />
              <Autocomplete
                id="selectClass"
                options={stateClassRecords}
                getOptionLabel={(option) => (option.classRecordInfo)}
                onChange={(event, value) => handleInputChangeSelectClass(value)}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Attending class:" variant="filled" />}
              />

              <div className="ButtonContainer">
              <Button onClick={addAttendeeRecord}
                color="primary" variant="contained" size="large"
                className="FormButton"
                startIcon={<CheckCircle className="WhiteIcon"/>}>
                    Book class
              </Button> 
              </div>  
          </form>   
        </Col>

        <Col className="CalendarCol">
        
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ChevronDown className="WhiteIcon" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Calendar
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
              <Calendar
              localizer={localizer}
              events={stateEvents}
              step={60}
              startAccessor="start"
              endAccessor="end"
              defaultView={Views.month}
              views={{ month: true, week: true, day: true, agenda: true }}
              defaultDate={new Date(2020, 2, 1)}
            />
              
           </ExpansionPanelDetails>
          </ExpansionPanel>
        </Col>
        <Col md={12} className="TableContainer">
          <BootstrapTable keyField='links[0].href'
            data={ stateAttendees } columns={ columns }  
            headerClasses="header-class"  bootstrap4 striped hover
            filter={ filterFactory() } bordered={ false } 
            cellEdit={ cellEditFactory({
              mode: 'click',
              blurToSave: true,
              afterSaveCell: (oldValue, newValue, row, column) => { updateAttendee(row); }
          }) }

          />
        </Col>

      </Row>
    </Container>
    </>
  );
}
























      

