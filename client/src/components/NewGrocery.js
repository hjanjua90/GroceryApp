//axios, useEffect, useState, Link

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";



const NewGrocery = (props) => {
    // This code here is prior to refractoring
    // const [name, setName] = useState("");
    // const [type, setType] = useState("");
    // const [boxArt, setBoxArt] = useState("");
    // const [quantity, setQuantity] = useState("");

    // refactored code 
    const [newGrocery, setNewGrocery] = useState ({
        name:"",
        type:"",
        quantity:"",
        boxArt:"",
    })

    const [errors, setErrors] = useState({});

    

    const navigate = useNavigate();


    // refactored code
    const newSubmitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/groceries",
        // this the request body the backend is asking for. This is where our front end and our backend talk.
        newGrocery
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/");
    })
    .catch((err)=>{
        console.log(err)
        console.log("err.response:", err.response);
        console.log("err.response.data:", err.response.data);
        console.log("err.response.data.errors:", err.response.data.errors);
        setErrors(err.response.data.errors);
    })
    const onChangeHandler = (e) =>{

        const newStateObject = {...newGrocery};
        newStateObject[e.target.name] = e.target.value;
        console.log("e.target.name = ", e.target.name);
        console.log("e.target.value = ", e.target.value);
        setNewGrocery(newStateObject)
}




    return (
        <div>
            <Header
                titleText={"Add your grocery items"}
                link={"/"}
                linkText={"Return to Dashboard"}
            />
            <Form
            submitHandler={newSubmitHandler}
            grocery={newGrocery}
            errors={errors}
            buttonText={"Add item"}
            onChangeHandler={onChangeHandler}
            />

        </div>
    )
}
}



export default NewGrocery;