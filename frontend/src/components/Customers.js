import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import TestComponent from './TestComponent';
import '../App.css';

export default function Customers() {

    const [stateCustomers, setState] = React.useState([]);

    useEffect( () => fetchData(), []);
    
    const fetchData = () => {
        fetch('http://localhost:8080/api/customers')
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
            Header: 'First name',
            accessor: 'firstName'
        },
        {
            Header: 'Surname',
            accessor: 'surName'
        },
        {
            Header: 'Tel',
            accessor: 'tel'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
    ];

    return (
        <div>
            <h1 className="SectionHeader">Customers</h1>
            <TestComponent />
            <ReactTable  filterable={true} data={stateCustomers} columns={columns} />
        </div>
    );
}