import React, { createContext, useReducer } from 'react';
import NavBar from './NavBar';
//import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { initialState, reducer } from './UseReducer';


const UserContext = createContext();
const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <NavBar />
            </UserContext.Provider>
        </>
    );
}

export default App;
export { UserContext }