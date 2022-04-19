import React from "react";
import { Button } from '@mui/material';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
            <h1 style={{textAlign:'center', fontSize: "4rem"}}>404 Error Page Not Found
            <br/>
            <br/>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "350px", height: "70px", margin: "5px", textAlign:'center' }}
              >
                <Link style={{ color: 'white', textDecoration: 'none', textAlign:'center', fontSize: "20px" }} to="/">Back To HOME</Link>
              </Button>
            </h1>
        </>

    );

}

export default ErrorPage;