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
        <div className="card" style={{backgroundColor: "#87CEFA"}}>
            <div class="card-header">
            <Link to={"/home"}>Home</Link>
            </div>
            <div class="card-body">
            <h5 class="card-title">{grocery.name}</h5>
            <p class="card-text">{grocery.type}</p>
            <p>{grocery.quantity}</p>
            <img src={grocery.boxArt} style={{ width: "150px", height: "200px" }}/>
            <br />
            <DeleteButton deleteHandler={deleteOneGrocery}/>
            </div>
        </div>

    )
}

export default DisplayOne;
