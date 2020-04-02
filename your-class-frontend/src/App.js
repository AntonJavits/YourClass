import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';


import Bookings from './components/Bookings';
import Customers from './components/Customers';
import ClassRecords from './components/ClassRecords';
import Teachers from './components/Teachers';


import './App.css';

function App() {

  
  return (
    <>
  <BrowserRouter>
    <Navigation />

    <Switch>
    
                <Route path="/bookings" component={Bookings} />
                <Route path="/customers" component={Customers} />
                <Route path="/classes" component={ClassRecords} />
                <Route path="/teachers" component={Teachers} />
                <Redirect from="/" to="/bookings"/>
            
            </Switch>
    </BrowserRouter>
    
     </>
  );
}

export default App;
