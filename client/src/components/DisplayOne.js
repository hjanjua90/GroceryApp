import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const DisplayOne = (props) =>{
    const [grocery, setGrocery] = useState({});

    const navigate = useNavigate();
// returns objects containing key-value pairs of parameters . The id can be destructured using our useParams().
    const {id} = useParams();
// tells React that your component needs to do something after render
    useEffect(()=>{
        // this id is very important because we are able to send it from displayAll to here via our Link element. 
        axios.get(`http://localhost:8000/api/groceries/${id}`)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setGrocery(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[id])

    const deleteOneGrocery = ()=>{
        axios.delete(`http://localhost:8000/api/groceries/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/")
                
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <header>
                <h1 style={{
                    fontSize: "50px", borderBottom: "5px double lightgray",
                    marginLeft: "450px", marginRight: "450px"
                }}>{grocery.name}</h1>
                <Link to={"/"}>Return to Dashboard</Link>
            </header>
            <p>{grocery.type}</p>
            <p>{grocery.quantity}</p>
            <img src={grocery.boxArt} style={{ width: "50px", height: "50px" }}/>
            <DeleteButton deleteHandler={deleteOneGrocery}/>
        </div>
    )
}

export default DisplayOne;
