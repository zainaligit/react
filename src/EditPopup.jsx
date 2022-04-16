import React from "react";

const Edit = (props) => {
    return (
        <>
            <Popup trigger={
                <Button style={{ backgroundColor: '#4169E1', color: '#FFFFFF' }} variant="contained" ><EditIcon /></Button>
            }
                onOpen={() => setItem(client)}
                position="right">
                <div>
                    <Card style={{ backgroundColor: '#F2ECFF' }} variant="outlined" sx={{ minWidth: 275 }}>
                        <CardContent>
                            <form method="PUT" onSubmit={(e) => {
                                e.preventDefault();
                                updateUser(props._id);
                            }}>
                                <div class="mb-3">
                                    <TextField
                                        autoFocus margin="dense"
                                        variant="standard"
                                        placeholder="Name"
                                        type="text"
                                        onChange={handleInput}
                                        name='name'
                                        defaultValue={props.name}
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
                                        defaultValue={client.email}
                                        class="form-control" >

                                    </TextField>
                                </div>
                                <div class="mb-3">
                                    <TextField autoFocus margin="dense"
                                        variant="standard"
                                        placeholder="Phone"
                                        type="number"
                                        name='phone'
                                        onChange={handleInput}
                                        defaultValue={client.phone}
                                        class="form-control"
                                        aria-describedby="emailHelp" >

                                    </TextField>
                                </div>
                                <div class="mb-3">
                                    <TextField autoFocus margin="dense"
                                        variant="standard"
                                        placeholder="Adress"
                                        type="text"
                                        name='adress'
                                        onChange={handleInput}
                                        defaultValue={client.adress}
                                        class="form-control"  >

                                    </TextField>
                                </div>
                                <div class="mb-3">
                                    <TextField autoFocus margin="dense"
                                        variant="standard"
                                        placeholder="State"
                                        type="text"
                                        name='state'
                                        onChange={handleInput}
                                        defaultValue={client.state}
                                        class="form-control" >

                                    </TextField>
                                </div>
                                <div class="mb-3">
                                    <TextField autoFocus margin="dense"
                                        variant="standard"
                                        placeholder="City"
                                        type="text"
                                        name='city'
                                        onChange={handleInput}
                                        defaultValue={client.city}
                                        class="form-control" >

                                    </TextField>
                                </div>
                                <Button style={{ backgroundColor: '#4169E1', color: 'white' }} variant="contained" type="submit" class="btn btn-primary" >Update</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Popup>
        </>
    )
}

export default Edit;