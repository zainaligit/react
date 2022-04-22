import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Popup from 'reactjs-popup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { Dialog, DialogActions, DialogTitle, Button,Paper  } from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUserDialog from "./EditUser";

const HomePage = () => {
    //Edit Dialog
    const [editopen, setEditOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

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

    const handleEditClickOpen = (value) => {
        setEditOpen(true);
        //console.log('user ki value ' + value.firstname)
        setSelectedValue(value)
        //populating updateform
        setItem(value)
    };

    const handleEditClose = () => {
        setEditOpen(false);
        fetchData()
    };

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
            <div style={{ height: '85vh' }}>
                {/* Page# header <h5 style={{textAlign:'center'}}>PAGE # {pageNumber + 1}</h5> */}
                <Paper elevation={2}>
                <h1 style={{textAlign:'center'}} >All Users</h1>
                <table class="table table-bordered">
                    <thead style={{ backgroundColor: '#677381', color: 'white' }}>
                        <tr>

                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Operations</th>
                        </tr>
                    </thead>
                    {
                        users.map((user) => (
                            <tbody>
                                <tr key={user._id}>
                                    <td >{user.firstname}</td>
                                    <td >{user.lastname}</td>
                                    <td >{user.email}</td>
                                    <td>
                                        <Link style={{color:'black'}} onClick={() => handleEditClickOpen(user)} ><EditIcon/></Link>
                                        &nbsp;
                                        <Link style={{ color: 'red' }} onClick={handleClickOpen}>
                                            <DeleteIcon/>
                                        </Link>
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
                                                <Button onClick={() => deleteUser(user._id)} style={{ color: 'red' }} autoFocus>Agree</Button>
                                            </DialogActions>
                                        </Dialog>
                                        &nbsp;
                                            <Link style={{ color:'blue' }} to={`/clients-detail/${user._id}`}><VisibilityIcon/></Link>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
                </Paper>
            </div>
            {/* Pagination Controller*/}
            <div style={{ textAlign: 'center' }}>
                {/* Pagination <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Button> */}
                <Link onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Link>
                &nbsp;
                {pages.map((pageIndex) => (
                    <Button size="small" variant="outlined" style={{ color: 'black', backgroundColor: '#DADDE2', borderRadius: '50%', fontWeight: 'bold', margin: '2px' }} key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                        {pageIndex + 1}
                    </Button>
                ))}
                &nbsp;
                {/* Pagination  <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoNext}><NavigateNextRoundedIcon /></Button> */}
                <Link onClick={gotoNext}><NavigateNextRoundedIcon /></Link>
                {/* Pagination Controller*/}
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
            <UpdateUserDialog
                selectedValue={selectedValue}
                open={editopen}
                onClose={handleEditClose}
                item={item}
                handleInput={handleInput}
            />
        </>
    );
}

export default HomePage;