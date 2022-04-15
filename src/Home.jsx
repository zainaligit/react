import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage = () => {
    //confirm del dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };
    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    //popup form handleinput
    const [item, setItem] = useState({
        firstname: '', lastname: '', email: '', password: '', cpassword: ''
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setItem({ ...item, [name]: value });
    }

    //update user
    const updateUser = async (id) => {
        //    alert('data updated for' + id)
        const { firstname, lastname, email, password, cpassword } = item;
        if (item.password !== item.cpassword) {
            alert('password are not matching')
        }
        else {
            await fetch(`http://localhost:5000/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password, cpassword: cpassword })
            });
        }
        fetchData();
    }


    //delete user
    const deleteUser = async (id) => {
        try {
            //alert(id)
            const res = await fetch(`http://localhost:5000/delete/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json();
            console.log(data);
            handleClose();
            toast.success('Successfully deleted')
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }


    //get users data
    const [users, setUsers] = useState([])
    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/users?page=${pageNumber}`);
        const { totalPages, users } = await response.json();
        setUsers(users)
        setNumberOfPages(totalPages);
        console.log('data agya');
        console.log(totalPages, users)
    }
    useEffect(() => {
        fetchData();
    }, [pageNumber])


    return (

        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
                {/* Page# header <h5 style={{textAlign:'center'}}>PAGE # {pageNumber + 1}</h5> */}
                <table class="table table-bordered">
                    <thead style={{ backgroundColor: '#677381', color: 'white' }}>
                        <tr>

                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Edit / Delete</th>
                        </tr>
                    </thead>
                    {
                        users.map((user, count) => (
                            <tbody>
                                <tr key={user._id}>

                                    <td >{user.firstname}</td>
                                    <td >{user.lastname}</td>
                                    <td >{user.email}</td>
                                    <td>
                                        <Popup trigger={
                                            <Button style={{ backgroundColor: '#4169E1', color: '#FFFFFF' }} variant="contained" ><EditIcon /></Button>
                                        }
                                            onOpen={() => setItem(user)}
                                            position="right">
                                            <div>
                                                <Card style={{ backgroundColor: '#F2ECFF' }} variant="outlined" sx={{ minWidth: 275 }}>
                                                    <CardContent>
                                                        <form method="PUT" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            updateUser(user._id);
                                                        }}>
                                                            <div class="mb-3">
                                                                <TextField
                                                                    autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="FirstName"
                                                                    type="text"
                                                                    onChange={handleInput}
                                                                    name='firstname'
                                                                    defaultValue={user.firstname}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="LastName"
                                                                    type="text"
                                                                    name='lastname'
                                                                    onChange={handleInput}
                                                                    defaultValue={user.lastname}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="Email"
                                                                    type="email"
                                                                    name='email'
                                                                    onChange={handleInput}
                                                                    defaultValue={user.email}
                                                                    class="form-control"
                                                                    aria-describedby="emailHelp" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="Password"
                                                                    type="password"
                                                                    name='password'
                                                                    onChange={handleInput}
                                                                    defaultValue={user.password}
                                                                    class="form-control"  >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="ConfirmPassword"
                                                                    type="password"
                                                                    name='cpassword'
                                                                    onChange={handleInput}
                                                                    defaultValue={user.cpassword}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <Button style={{ backgroundColor: '#4169E1', color: 'white' }} variant="contained" type="submit" class="btn btn-primary" >Update</Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Popup>
                                        &nbsp;
                                        <Button style={{ color: 'red' }} variant="outlined" startIcon={<DeleteIcon style={{ color: 'red' }} />} onClick={handleClickOpen}>
                                            Delete
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Do you want to delete this entry?"}
                                            </DialogTitle>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Disagree</Button>
                                                <Button onClick={()=>deleteUser(user._id)} style={{ color: 'red' }} autoFocus>Agree</Button>
                                            </DialogActions>
                                        </Dialog>
                                        &nbsp;
                                        <Button
                                            variant="outlined" startIcon={<VisibilityIcon />}
                                        >
                                            <Link style={{ textDecoration: 'none' }} to={`/clients-detail/${user._id}`}>View-Clients</Link>
                                        </Button>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
                
                <br />
                {/* Pagination Controller*/}
                <div style={{ textAlign: 'center' }}>
                    {/* Pagination <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Button> */}
                    <Link onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Link>
                    &nbsp;
                    {pages.map((pageIndex) => (
                        <Button size="small" variant="outlined" style={{ color: 'white', backgroundColor: '#677381', borderRadius: 10, fontWeight: 'bold', margin: '2px' }} key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </Button>
                    ))}
                    &nbsp;
                    {/* Pagination  <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoNext}><NavigateNextRoundedIcon /></Button> */}
                    <Link onClick={gotoNext}><NavigateNextRoundedIcon /></Link>
                    {/* Pagination Controller*/}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

export default HomePage;