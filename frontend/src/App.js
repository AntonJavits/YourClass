import React, { Fragment } from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Reservation from './components/Reservation';
import Customers from './components/Customers';
import Classes from './components/Classes';
import Teachers from './components/Teachers';
import Reports from './components/Reports';

import './App.css';
import 'typeface-roboto';


    function App() {

        const useStyles = makeStyles(theme => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              padding: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
          }));

        const classes = useStyles();

        const allTabs = ['/', '/customers', '/classes', '/teachers', '/reports'];
    
        return (
  
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
       
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12}>
                                <BrowserRouter>
                                    <Route path="/" render={({ location }) => (
                                        <Fragment>
                                            <Tabs value={location.pathname}>
                                            <Tab label="Reservation" value="/" component={Link} to={allTabs[0]} />
                                            <Tab label="Customers" value="/customers" component={Link} to={allTabs[1]} />
                                            <Tab label="Classes" value="/classes" component={Link} to={allTabs[2]} />
                                            <Tab label="Teachers" value="/teachers" component={Link} to={allTabs[3]} />
                                            <Tab label="Reports" value="/reports" component={Link} to={allTabs[4]} />
                                            </Tabs>
                                            <Switch>
                                            <Route exact path={allTabs[0]} component={Reservation} />
                                            <Route path={allTabs[1]} component={Customers} />
                                            <Route path={allTabs[2]} component={Classes} />
                                            <Route path={allTabs[3]} component={Teachers} />
                                            <Route path={allTabs[4]} component={Reports} />
                                            </Switch>
                                        </Fragment>
                                        )}
                                    />
                                </BrowserRouter>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
        </React.Fragment>

    );
}

  
export default App;