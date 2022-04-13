import React from "react";

const Logout = () =>{


    const LogoutUser = () =>{
        localStorage.removeItem('token');
    }

    return (
        <>
            <h1>logout</h1>
        </>
    );
}

export default Logout;