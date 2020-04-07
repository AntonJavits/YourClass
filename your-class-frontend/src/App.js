import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';


import Bookings from './components/Bookings';
import Customers from './components/Customers';
import ClassRecords from './components/ClassRecords';
import Teachers from './components/Teachers';
import Reports from './components/Reports';


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
                <Route path="/reports" component={Reports} />
                <Redirect from="/" to="/bookings"/>
                <Redirect from="/error" to="/bookings"/>
            
            </Switch>
    </BrowserRouter>
    
     </>
  );
}

export default App;