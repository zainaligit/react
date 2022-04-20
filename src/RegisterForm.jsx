import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {  Grid, Paper, Button, TextField,  Typography,  Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        firstname: '', lastname: '', email: '', password: '', cpassword: ''
    });

    let name, value;
    const handleInput = (e) => {

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
        checkValidation();
    }

    //form validation
    const [validation, setValidation] = useState({
        email: "",
        password: ""
      });
      const checkValidation = () => {
        let errors = validation;
    
        // email validation
        const emailCond = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
        if (!user.email.trim()) {
          errors.email = "Email is required";
        } else if (!user.email.match(emailCond)) {
          errors.email = "Please enter a valid email address";
        } else {
          errors.email = "";
        }
    
        //password validation
        const cond1 = "/^(?=.*[a-z]).{6,20}$/";
        const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
        const cond3 = "/^(?=.*[0-9]).{6,20}$/";
        const password = user.password;
        if (!password) {
          errors.password = "password is required";
        } else if (password.length < 6) {
          errors.password = "Password must be longer than 6 characters";
        } else if (password.length >= 20) {
          errors.password = "Password must shorter than 20 characters";
        }  else if (!password.match(cond2)) {
          errors.password = "Password must contain at least one capital letter";
        } else if (!password.match(cond3)) {
          errors.password = "Password must contain at least a number";
        } else {
          errors.password = "";
        }
    
        setValidation(errors);
      };

    /*
      useEffect(() => {
        checkValidation();
      }, [user]);
     */ 
  //

    const postData = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email, password, cpassword } = user;
        if (!firstname || !lastname || !email || !password || !cpassword) {
            toast.error('fill the fields properly');
        }
        else if (user.password !== user.cpassword) {
            toast.error('password are not matching')
        }
        else {
            await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password, cpassword: cpassword })
            });
            setUser('');
            toast.success('Signup successfully')
            
            setTimeout(function () {
                history.push('/login')
            }, 1000);
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '100vh' }}>
                <br />
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '86vh', margin: '20px auto' }}>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><AccountCircleIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>SIGN UP</h2>
                        <form method="POST">
                            <TextField
                                onChange={handleInput}
                                name='firstname'
                                value={user.firstname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="FirstName"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='lastname'
                                value={user.lastname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="LastName"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='email'
                                value={user.email}
                                style={{ width: "350px", margin: "5px" }}
                                type="email"
                                label="Email"
                                variant="outlined"
                            />
                            {validation.email && <p>&nbsp;{validation.email}</p>}
                            <TextField
                                onChange={handleInput}
                                name='password'
                                value={user.password}
                                style={{ width: "350px", margin: "5px" }}
                                type="password"
                                label="Password"
                                variant="outlined"
                            />
                            {validation.password && <p>&nbsp;{validation.password}</p>}
                            <TextField
                                onChange={handleInput}
                                name='cpassword'
                                value={user.cpassword}
                                style={{ width: "350px", margin: "5px" }}
                                type="password"
                                label="ConfirmPassword"
                                variant="outlined"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={postData}
                                style={{ width: "350px", margin: "5px" }}
                            >
                                sign up
                            </Button>
                            <hr />
                            <Typography>Do you have an account?
                                &nbsp;<Link to='/login'>Login</Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
export default Register;