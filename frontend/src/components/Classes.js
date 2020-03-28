import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../App.css';

export default function Classes() {

    const [stateClasses, setState] = React.useState([]);
    useEffect( () => fetchData(), []);

    const fetchData = () => {
        fetch('http://localhost:8080/api/classRecords')
        .then(response => response.json())
        .then(data => { 
            setState(data.content);
            console.log(data); 
            console.log(data.content[0]);
        } )
        .catch(err => console.log(err))
    };

    const columns = [
        {
            Header: 'Date & Time',
            accessor: 'startDateTime'
        },
        {
            Header: 'Class',
            accessor: 'name'
        },
        {
            Header: 'Teacher',
            accessor: 'teacherFullName'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
    ];
    return (
        <div>
            <h1 className="SectionHeader">Classes</h1>

            <ReactTable filterable={true} data={stateClasses} columns={columns} />

        </div>
    )
}