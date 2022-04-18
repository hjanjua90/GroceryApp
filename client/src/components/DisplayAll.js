//axios, useEffect, useState, Link

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { Table } from "react-bootstrap"; 
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'



const DisplayAll = (props) => {


    const [groceryList, setGroceryList] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        //Our simple request to get all grocery items! "/api/movies" in our routes!
        axios.get("http://localhost:8000/api/groceries")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setGroceryList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    const deleteGrocery = (idFromBelow)=>{
        axios.delete(`http://localhost:8000/api/groceries/${idFromBelow}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGroceryList(groceryList.filter(grocery => grocery._id !== idFromBelow))
            })
            .catch((err)=>console.log(err))
    }

    useEffect(() => {
        console.log('=========getting all users======')
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true , credentials:"include",}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, 
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <div style={{backgroundColor: "#FFFACD"}}>
            <header>
                <h1 style={{
                    fontSize: "50px", borderBottom: "5px double lightgray",
                     color:"#FF4500",fontFamily:"monospace"
                }}>Get This NOT That
                </h1>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Link to={"/new"}>Add New Grocery Item</Link>
                {/* <Link to={`/user/profile/${user.username}`}>{user.username} Profile</Link> */}
                    <button className="btn btn-primary m-1" onClick={logout}>Logout</button>
                </div>
            </header>
            <Table style={{margin:"auto", border:"1px solid black"}}>
                <thead style={{backgroundColor:"lightgray", color:"#FF4500"}}>
                <tr>
                        <th>Item</th> 
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>BoxArt</th>
                        <th>In cart</th>
                        <th>Actions</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {
                            groceryList.map((grocery,index)=>(
                                <tr key={index}>
                                    {/* <td>
                                        <Link to={`/user/profile/${grocery.createdBy?.username}`}>{grocery.createdBy?.username}</Link>
                                    </td> */}
                                    <td>
                                        <Link to={`/grocery/${grocery._id}`}>{grocery.name}</Link>
                                    </td>
                                    <td>
                                        {grocery.type}
                                    </td>
                                    <td>
                                        {grocery.quantity}
                                    </td>
                                    <td>
                                        <img src={grocery.boxArt} style={{width: "100px", height:"100px"}}/>
                                    </td>
                                    <td>
                                        <input type= "checkBox"/>
                                    </td>

                                    <td>
                                    <Link to={`/grocery/edit/${grocery._id}`}><Button variant="warning" size="sm">Edit </Button></Link>
                                    <DeleteButton deleteHandler={()=>deleteGrocery(grocery._id)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </Table>
        </div>
    )
}




export default DisplayAll;