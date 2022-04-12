import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Stack, Link, Grid, Paper, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const AddClients = () => {
    const history = useHistory()

    const [quote, setQuote] = useState('')

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
            console.log(quote)
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
    }

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, phone, adress, state, city } = client;
        const users = quote;

        if (!name || !email || !phone || !adress || !state || !city) {
            alert('plzz fill the fields');
        }
        else {
            await fetch(`http://localhost:5000/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, phone: phone, adress: adress, state: state, city: city, users: users })
            });
            //history.push('/')
        }

    }

    return (
        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
                <br />
                <p>Logged in user is: {quote || 'No quote found'}</p>
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '80vh', margin: '20px auto' }}>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><AccessibilityNewIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>ADD CLIENTS</h2>
                        <form method="POST">
                            <TextField
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
                                onChange={handleInput}
                                name='email'
                                value={client.email}
                                style={{ width: "350px", margin: "5px" }}
                                type="email"
                                label="Email"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='phone'
                                value={client.phone}
                                style={{ width: "350px", margin: "5px" }}
                                type="number"
                                label="Phone"
                                variant="outlined"
                            />
                            <br />
                            <TextField
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
                                onChange={handleInput}
                                name='city'
                                value={client.city}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="City"
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
                                add client
                            </Button>

                        </form>
                    </Paper>
                </Grid>
            </div>
        </>
    );
}

export default AddClients;
