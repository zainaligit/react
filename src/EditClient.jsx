import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import { Paper, Button, TextField } from '@mui/material';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateClientDialog(props) {

    const { onClose, selectedValue, open, item, handleInput } = props;
    const handleClose = () => {
        onClose();
    };

    //update client
    const updateUser = async (id) => {
        //    alert('data updated for' + id)
        const { name, email, phone, adress, state, city } = item;
        if (!name || !email || !phone || !adress || !state || !city) {
            alert(' empty data')
        }
        else {
            await fetch(`http://localhost:5000/clients/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, phone: phone, adress: adress, state: state, city: city })
            });
        }
        handleClose();
        toast.success('Updated successfully')
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div>
                <Paper style={{ width: '400px', padding: '14px' }}>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>Update Booking</h3>
                    <form method="PUT" >
                        <TextField
                            required
                            onChange={handleInput}
                            name='name'
                            value={item.name}
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
                            value={item.email}
                            style={{ width: "350px", margin: "5px" }}
                            type="email"
                            label="Email"
                            variant="outlined"
                        />
                        <br />
                        <TextField
                            required
                            onChange={handleInput}
                            name='phone'
                            value={item.phone}
                            style={{ width: "350px", margin: "5px" }}
                            type="phone"
                            label="Phone"
                            variant="outlined"

                        />
                        <br />
                        <TextField
                            required
                            onChange={handleInput}
                            name='adress'
                            value={item.adress}
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
                            value={item.state}
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
                            value={item.city}
                            style={{ width: "350px", margin: "5px" }}
                            type="text"
                            label="City"
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
export default UpdateClientDialog;

UpdateClientDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
};

