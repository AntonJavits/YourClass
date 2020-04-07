let previousRecord = '';
let counter = 0;
 for (let i=0; i<data.length; i++) {
     console.log(classes);
     console.log("i: " + i);
     console.log("data[i].classRecordName: " + data[i].classRecordName);
     console.log("Previous record: " + previousRecord);
     if ( data[i].classRecordName === previousRecord) {
          counter++;
          classes[previousRecord] = counter;
          console.log("classes[previousRecord]: " + classes[previousRecord]);
      } else {
          console.log("It's new!");
          counter = 1;
          // classes.push({ [data[i].classRecordName] : counter });
          previousRecord = data[i].classRecordName;
      }
  } 
  console.log(classes);









  import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Container, Row, Col } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Trash, PersonPlus } from 'react-bootstrap-icons';

import { ResponsiveContainer, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

import '../App.css';

export default function Reports() {



    // State of values in table
    const [stateClasses, setState] = React.useState([]);
    
    const count = (obj) => {
        let count=0;
        for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
        }
        return count;
    }

   
   // console.log("Count props in [0]: " + count(stateAllAttendees[0]));
    
    useEffect( () => fetchData(), []);

    let classes = [];

    const fetchData = () => {
        console.log("start fetch");
        fetch('http://localhost:8080/getattendees')
        .then(response => response.json())
        .then(data => { 
            setState(data);
            console.log(data);
            console.log("Total attendees: " + data.length);
            console.log("Total attendees: " + data[0].classRecordName);  
            console.log( count(data[0]) );

            let previousRecord = '';
            let previousIndex = -1;
            let counter = 0;
            for (let i=0; i<data.length; i++) {
               
               if ( data[i].classRecordName === previousRecord) {
                    counter++;
                    classes[previousIndex].count = counter;
                } else {
                    counter = 1;
                    classes.push({ 'name' : data[i].classRecordName, 'count' : counter });
                    previousRecord = data[i].classRecordName;
                    console.log(classes[previousIndex]);
                    previousIndex++;
                    }
                } 
                console.log(classes);
                setState(classes);
            } )
            .catch(err => console.log(err))
    };
 
const data = [
      {name: 'Page A', uv: 30},
      {name: 'Page B', uv: 15},
      {name: 'Page C', uv: 7},
      {name: 'Page G', uv: 26},
];

console.log("DATA: ");
console.log(data);
console.log("CLASSES: ");
console.log(stateClasses);
        return (
            
        <Container fluid={"xl"} className="BodyContainer">
        <Row>
            <Col className="SectionHeader">
                <h1 className="SectionHeaderTitle">Reports</h1>
            </Col>
        </Row>
        <Row>
            <Col md={12} className="AddFormContainer">

                <BarChart width={600} height={300} data={stateClasses} layout="vertical"
                margin={{top: 50, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip/>
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            
            
            </Col>
            <Col>
            
            
            
            </Col>
        </Row>
    </Container>
    
  );
}


if ( teacherRecordsData.filter(rec => rec.Name === data.content[i].teacherFullName) ) {
               
    // for(var n = 0; n < teacherRecordsData.length; n++) {
    //     if (vendors[n].Name == 'Magenic') {
    //         found = true;
    //         break;
    //     }
    // }

    myArray.sort(function(a, b) {
        return a.distance - b.distance;
    });