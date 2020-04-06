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

import { ResponsiveContainer, ComposedChart, Text, AxisLabel, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

import '../App.css';

export default function Reports() {



    // State of values in table
    const [stateClasses, setState] = React.useState([]);

    const[teacherRecords, setStateTeacherRecords] = React.useState([]);
    
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
    useEffect( () => fetchDataTeachers(), []);

    let classes = [];

    const fetchData = () => {
        console.log("start fetch");
        fetch('http://localhost:8080/getattendees')
        .then(response => response.json())
        .then(data => { 
            console.log(data);

            data.sort((a, b) => a.classRecordInfo.localeCompare(b.classRecordInfo));

            let previousRecord = '';
            let previousIndex = -1;
            let counter = 0;
            for (let i=0; i<data.length; i++) {
               if ( data[i].classRecordInfo === previousRecord) {
                    counter++;
                    classes[previousIndex].count = counter;
                } else {
                    counter = 1;
                    classes.push({ 'name' : data[i].classRecordInfo, 'count' : counter });
                    previousRecord = data[i].classRecordInfo;
                    previousIndex++;
                    }
                } 
                console.log(classes);
                setState(classes);
            } )
            .catch(err => console.log(err))
    };

    let teacherRecordsData = [];

    const fetchDataTeachers = () => {
        console.log("start fetch");
        fetch('http://localhost:8080/api/classRecords')
        .then(response => response.json())
        .then(data => { 
            console.log("ClassRec fetch");
            
            console.log(data.content[0].teacherFullName);
            console.log(data.content);

            let previousRecord = '';
            let previousIndex = -1;
            let counter = 0;
          
            data.content.sort((a, b) => a.teacherFullName.localeCompare(b.teacherFullName));

            for (let i=0; i<data.content.length; i++) {
               
               if ( data.content[i].teacherFullName === previousRecord) {
                console.log("1. data[" + i + "]: " + data.content[i].teacherFullName);
                   console.log("2. data[" + i + "] equals " + previousRecord);
                    counter = counter + data.content[i].duration / 60;
                    teacherRecordsData[previousIndex].hours = counter;
                    console.log("3. teacherRecordsData[" + previousIndex + "].hours = " + counter);
                } else {
                    counter = data.content[i].duration / 60;
                    teacherRecordsData.push({ 'name' : data.content[i].teacherFullName, 'hours' : counter });
                    previousRecord = data.content[i].teacherFullName;
                    previousIndex++;
                    console.log("Index to compare: " + previousIndex);
                    console.log(data.content[previousIndex]);
                    
                    }
                } 
                console.log(teacherRecordsData);
                setStateTeacherRecords(teacherRecordsData);
            } )
            .catch(err => console.log(err))
    };





    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">Class: {`${label}`}<br/>
              Atteendees: {`${payload[0].value}`}</p>
             
            </div>
          );
        }
      
        return null;
      };

      const CustomTooltipT = ({ active, payload, label }) => {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">Teacher: {`${label}`}<br/>
              Total hours: {`${payload[0].value}`}</p>
             
            </div>
          );
        }
      
        return null;
      };

        return (
            
        <Container fluid={"xl"} className="BodyContainer">
        <Row>
            <Col className="SectionHeader">
                <h1 className="SectionHeaderTitle">Reports</h1>
            </Col>
        </Row>
        <Row>
            <Col md={12} className="AddFormContainer">
                
                <BarChart width={800} height={300} data={stateClasses} layout="vertical"
                margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number"/>
        <YAxis type="category" width={300} dataKey="name"/>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
                
            
            
            </Col>
            <Col className="AddFormContainer">
            
                <BarChart width={800} height={300} data={teacherRecords} layout="vertical"
                margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis type="number"/>
                <YAxis type="category" width={300} dataKey="name"/>
                <Tooltip content={<CustomTooltipT />} />
                <Legend />
                <Bar dataKey="hours" fill="#82ca9d" />
                </BarChart>
            
            
            </Col>
        </Row>
    </Container>
    
  );
}


