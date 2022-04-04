//axios, useEffect, useState, Link

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"


const DisplayAll = (props) => {


    const [groceryList, setGroceryList] = useState([]);

    useEffect(() => {
        //Our simple request to get all games! "/api/movies" in our routes!
        axios.get("http://localhost:8000/api/groceries")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setGroceryList(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    // const deleteGrocery = (idFromBelow)=>{
    //     axios.delete(`http://localhost:8000/api/groceries/${idFromBelow}`)
    //         .then((res)=>{
    //             console.log(res);
    //             console.log(res.data);
    //             setGroceryList(GroceryList.filter(grocery => grocery._id !== idFromBelow))
    //         })
    //         .catch((err)=>console.log(err))
    // }


    return (
        <div>
            <header>
                <h1 style={{
                    fontSize: "50px", borderBottom: "5px double lightgray",
                    marginLeft: "450px", marginRight: "450px"
                }}>Get This Not That
                </h1>
                {/* path to our NewMovie component as set in the Router in app.js */}
                <Link to={"/new"}>Add A Grocery Item</Link>

            </header>

            {
                groceryList.map((grocery, index) => (
                    <div
                        style={{textAlign:"center"}}
                        key={grocery._id}
                    >
                        <Link to={`/grocery/${grocery._id}`}>{grocery.name}</Link>
                        <br/>
                        {/* <img src={grocery.boxArt} style={{ width: "150px", height: "150px" }} /> */}
                        <br/>
                        {/* <button onClick={()=>deleteGrocery(grocery._id)} >Delete</button> */}
                        <Link to={`/grocery/edit/${grocery._id}`}>Edit</Link>

                    </div>

                ))
            }


        </div>
    )
}




export default DisplayAll;