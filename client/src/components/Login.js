import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true, credentials:"include",
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className="blurred-box-form mt-5 text-center m-5">
            <h1>Login</h1>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <div className="form">
            <form  className= "form-control blurred-box" onSubmit={login}>
                <div>
                    <label className="form-label">Email</label>
                    <br/>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label  className="form-label">Password</label>
                    <br/>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="center">
                    <Button variant="primary" size="sm" type="submit" margin="50px">Sign In</Button>
                </div>
            </form>
            </div>
        </div>
    );
};


export default Login