import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import { Paper, Button, TextField } from '@mui/material';

function UpdateUserDialog(props) {

    const { onClose, selectedValue, open, item, handleInput } = props;
    const handleClose = () => {
        onClose();
    };

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
        handleClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div>
                <Paper style={{ width: '400px', padding: '14px' }}>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>Update Booking</h3>
                    <form method="PUT" >
                    <TextField
                                onChange={handleInput}
                                name='firstname'
                                value={item.firstname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="FirstName"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='lastname'
                                value={item.lastname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="LastName"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='email'
                                value={item.email}
                                style={{ width: "350px", margin: "5px" }}
                                type="email"
                                label="Email"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='password'
                                value={item.password}
                                style={{ width: "350px", margin: "5px" }}
                                type="password"
                                label="Password"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='cpassword'
                                value={item.cpassword}
                                style={{ width: "350px", margin: "5px" }}
                                type="password"
                                label="ConfirmPassword"
                                variant="outlined"
                            />
                        <br />
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={() => updateUser(selectedValue._id)} style={{ color: 'green' }} autoFocus>Update</Button>
                        </DialogActions>

                    </form>
                </Paper>
            </div>
        </Dialog>
    );
}
export default UpdateUserDialog;

UpdateUserDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
};

