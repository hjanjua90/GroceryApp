//axios, useEffect, useState, Link

import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';




const NewGrocery = (props) => {
    // This code here is prior to refractoring
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [boxArt, setBoxArt] = useState("");
    const [quantity, setQuantity] = useState("");
    const [inCart, setInCart] = useState(false);


    const [errors, setErrors] = useState({});

    

    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/groceries",
        //request's body that the back-end is asking for (see our controller)... create(req.body) THIS IS THAT!
        {
            name,
            type, //the getter MUST MATCH the field name in schema to write it this way
            boxArt,
            quantity,
            inCart,
        })
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
    }





    return (
        <div>
            <header style={{ borderBottom: "5px double lightgray", padding: "10px", margin: "10px" }}>
                <h1 style={{ fontSize: "50px", marginLeft: "450px", marginRight: "450px" }}>Add an Item</h1>
                <Link to={"/"}>Return Home</Link>
            </header>
            <Form onSubmit={submitHandler}>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <br/>
                    {
                        errors.name?
                        <span>{errors.name.message}</span>
                        :null
                    }
                </div>
                <div>
                    <label>Type</label>
                    <select value={type} name="type" onChange={(e) => setType(e.target.value)} >
                        <option defaultValue hidden>Select a Type</option>
                        <option value="Produce">Produce</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Baking/Spices">Baking/Spices</option>
                        <option value="Household Goods">Household Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Paper/Plastic">Paper/Plastic</option>
                        <option value="Bread/Grains">Bread/Grains</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Condiments">Condiments</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meat/Protein">Family</option>
                        <option value="Dairy">Animated</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Pet Care">Pet Care</option>
                    </select>
                    <br />
                    {
                        errors.type ?
                            <span>{errors.type.message}</span>
                            : null
                    }
                </div>
 
                <div>
                    <label>boxArt</label>
                    <input value={boxArt} onChange={(e) => setBoxArt(e.target.value)} type="text" />
                    <br />
                    {
                        errors.boxArt ?
                            <span>{errors.boxArt.message}</span>
                            : null
                    }
                </div>
 
                <div>
                    <label>Quantity</label>
                    <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" />
                    <br />
                    {
                        errors.quantity ?
                            <span>{errors.quantity.message}</span>
                            : null
                    }    
                </div>
                {/* <div>
                    <label>In Cart</label>
                    <input checked={inCart} onChange={(e) => setInCart(e.target.checked)} type="checkbox" />
                    <br />
                    {
                        errors.inCart ?
                            <span>{errors.inCart.message}</span>
                            : null
                    }
                </div> */}
                <Button>Add Item</Button>
        </Form>
    </div>
    )


}





export default NewGrocery;