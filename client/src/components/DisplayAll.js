//axios, useEffect, useState, Link

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import DeleteButton from "./DeleteButton";
import { Table } from "react-bootstrap"; 



const DisplayAll = (props) => {


    const [groceryList, setGroceryList] = useState([]);

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


    return (
        <div>
            <Header
            titleText= {"Get this Not that"}
            link={"/new"}
            linkText={"Add new item"}
            />
            <Table style={{margin:"auto", border:"1px solid black"}}>
                <thead style={{backgroundColor:"lightgray", color:"white"}}>
                <tr>
                        <th>Item</th> 
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            groceryList.map((grocery,index)=>(
                                <tr key={index}>
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
                                    <Link to={`/grocery/edit/${grocery._id}`}><button >Edit </button></Link>
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