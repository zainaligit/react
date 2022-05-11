import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Grid, Paper, Button, TextField, Avatar } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CancelIcon from '@mui/icons-material/Cancel';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClients = () => {
    const [verify, setVerify] = useState()
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [quote, setQuote] = useState('')
    const [secret, setSecret] = useState([])
    const [user, setUser] = useState({
        token: '', secretKey: ''
    });

    async function populateQuote() {
        const res = await fetch('http://localhost:5000/clients-detail', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await res.json()
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            //console.log(token)
            const user = jwt_decode(token)
            //console.log(quote)
            populateQuote();
        }
    }, [])

    const [client, setClient] = useState({
        name: '', email: '', phone: '', adress: '', state: '', city: '', users: ''
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setClient({ ...client, [name]: value });
        checkValidation();
    }

    const handleInputOtp = (e) => {

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
        getSecret()

    }

    //get secret from db
    const getSecret = async () => {
        let id = quote;
        const response = await fetch(`http://localhost:5000/otpfromdb/${id}`);
        const data = await response.json();
        setSecret(data.secret)
        console.log(secret)
    }

    //verify otp
    const verifyOtp = async (e) => {
        e.preventDefault();
        const { token } = user;
        let secretKey = secret;
        const res = await fetch('http://localhost:5000/verifyformsotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, secretKey: secretKey })
        });
        const data = await res.json();
        if (!token) {
            toast.error('plzz enter otp')
        } else if (data.error) {
            toast.error(data.error)
        } else {
            toast.success('Otp Verified Successfully')
            setShow(!show)
        }
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, adress, state, city } = client;
        const users = quote;

        if (!name || !email || !phone || !adress || !state || !city) {
            toast.error('Fill the fields');
        }
        else {
            await fetch(`http://localhost:5000/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, phone: phone, adress: adress, state: state, city: city, users: users })
            });
            toast.success('Client added')
            setClient('');

            setTimeout(function () {
                history.push('/clientsdetail')
            }, 1000);
        }
    }

    //form validation
    const [validation, setValidation] = useState({
        email: "",
        phone: ""
    });
    const checkValidation = () => {
        let errors = validation;
        // email validation
        const emailCond = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
        if (!client.email.trim()) {
            errors.email = "Email is required";
        } else if (!client.email.match(emailCond)) {
            errors.email = "Please enter a valid email address";
        } else {
            errors.email = '';
        }

        //phone validation
        var phone = '1234567890';
        if (!client.phone.match('[0-9]{10}')) {
            errors.phone = 'Please provide valid phone number';
        } else {
            errors.phone = '';
        }
        setValidation(errors);
    };
    /*
        useEffect(() => {
            checkValidation();
        }, [client]);
    */
    //

    return (
        <>
        
            <div style={{ backgroundColor: '#E2E2E2', height: '100vh' }}>
                <br />
                <p>{/**Logged in... {quote || 'Unknown User'} */}</p>
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '90vh', margin: '20px auto' }}>
                        <div style={{ textAlign: 'right' }} ><Link style={{ color: 'red' }} to={`/`}><CancelIcon /></Link></div>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><AccessibilityNewIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>ADD CLIENTS</h2>
                        <form method="POST" >
                            <TextField
                                required
                                onChange={handleInput}
                                name='name'
                                value={client.name}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="Name"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                required
                                onChange={handleInput}
                                name='email'
                                value={client.email}
                                style={{ width: "350px", margin: "5px" }}
                                type="email"
                                label="Email"
                                variant="outlined"
                            />
                            {validation.email && <p>&nbsp;{validation.email}</p>}
                            <TextField
                                required
                                onChange={handleInput}
                                name='phone'
                                value={client.phone}
                                style={{ width: "350px", margin: "5px" }}
                                type="phone"
                                label="Phone"
                                variant="outlined"
                                placeholder="+92--------"
                            />
                            {validation.phone && <p>&nbsp;{validation.phone}</p>}
                            <TextField
                                required
                                onChange={handleInput}
                                name='adress'
                                value={client.adress}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="Adress"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                required
                                onChange={handleInput}
                                name='state'
                                value={client.state}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="State"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                required
                                onChange={handleInput}
                                name='city'
                                value={client.city}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="City"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                name='token'
                                onChange={handleInputOtp}
                                value={user.token}
                                style={{ width: "350px", margin: "5px" }}
                                type="number"
                                label="Enter 6 digit otp"
                                variant="outlined"
                            />
                            <br />
                            {
                                show ?
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={postData}
                                        style={{ width: "350px", margin: "5px" }}
                                    >
                                        add client
                                    </Button> : <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={verifyOtp}
                                        style={{ width: "350px", margin: "5px" }}
                                    >
                                        Verify
                                    </Button>
                            }

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

export default AddClients;
