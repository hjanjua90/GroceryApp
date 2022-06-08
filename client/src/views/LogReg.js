import React, {useState, useEffect} from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

const LogReg = (props) => {



    return (
        <div className="logRegContainer">
            <header style={{color:"#FF4500",fontFamily:"monospace"}} className="text-center blurred-box-form text-center">
                <h1 style={{fontSize: "100px"}}>
                Get This NOT That
                </h1>
            </header>
            <div style={{fontFamily:"monospace"}} className="d-flex justify-content-center align-items-start">
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default LogReg;
