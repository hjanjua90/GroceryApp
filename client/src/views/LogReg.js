import React, {useState, useEffect} from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

const LogReg = (props) => {



    return (
        <div className="logRegContainer">
            <header style={{borderBottom: "5px double yellow",
                    color:"#FF4500",fontFamily:"monospace"}}>
                <h1 style={{fontSize: "100px"}}>
                Get This NOT that
                </h1>
            </header>
            <div style={{display:"flex", margin:"40px", fontFamily:"monospace"}}>
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default LogReg;
