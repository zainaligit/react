import React, { createContext, useContext, useReducer } from 'react';
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomePage from './Home';
import NavBar from './NavBar';
import ErrorPage from './ErrorPage';
import Register from './RegisterForm';
import Login from './LoginForm';
import Logout from './Logout';
import AddClients from './Clients';
import Booking from './CarBooking';
//import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import ClientsDetail from './ShowClients';
import BookingsDetail from './ShowBookings';
import AllClients from './AllClients';
import AllBookings from './AllBookings';
import { initialState, reducer } from './UseReducer';

const UserContext = createContext();

const Routing = () => {
    return (
        <Router>
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route path="/signup">
                <Register />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/Logout'>
                <Logout />
            </Route>
            <Route path='/addclients'>
                <AddClients />
            </Route>
            <Route path='/bookings/:id'>
                <Booking />
            </Route>
            <Route path='/clients-detail/:id'>
                <ClientsDetail />
            </Route>
            <Route path='/bookings-detail/:id'>
                <BookingsDetail />
            </Route>
            <Route path='/clientsdetail'>
                <AllClients />
            </Route>
            <Route path='/bookingsdetail'>
                <AllBookings />
            </Route>
            <Route path='/Logout'>
                <Logout />
            </Route>
            <Route>
                <ErrorPage />{/* if you go on wrong address */}
            </Route>
        </Switch>
        </Router>
    )
}

const App = () => {
    const history = useHistory();
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <NavBar/>
            </UserContext.Provider>
        </>
    );
}

export default App;
export { UserContext }