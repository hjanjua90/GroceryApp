import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditGrocery = (props)=>{
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [boxArt, setBoxArt] = useState("");
    const [quantity, setQuantity] = useState("");

    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/groceries/${id}`)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setName(res.data.name);
            setType(res.data.type);
            setBoxArt(res.data.boxArt);
            setQuantity(res.data.quantity);
        })
        .catch((err)=>console.log(err))
    },[id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/groceries/${id}`,
            {
                name,
                type, //the getter MUST MATCH the field name in schema to write it this way
                boxArt,
                quantity,
            },
            {withCredentials:true, credentials:'include'}
            )
                .then((res)=>{
                    console.log(res);
                    console.log(res.data);
                    navigate("/home");
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
                <h1 style={{ fontSize: "50px", fontFamily:"monospace" ,color:"#FF4500" }}>Update Item!</h1>
                <Link to={"/home"}>Return Home</Link>
            </header>
            <div className="form">
            <form onSubmit={submitHandler} className= "form-control">
                <div>
                    <label className="form-label">Name</label>
                    <input className = "form-control" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <br/>
                    {
                        errors.name?
                        <span>{errors.name.message}</span>
                        :null
                    }
                </div>
                <div>
                    <label className="form-label">Type</label>
                    <select className="form-select" value={type} name="type" onChange={(e) => setType(e.target.value)} >
                        <option defaultValue hidden>Select a Type</option>
                        <option value="Produce">Produce</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Baking/Spices">Baking/Spices</option>
                        <option value="Household Goods">Household Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Baby Food">Baby Food</option>
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
                    <label className="form-label">boxArt</label>
                    
                    <input className = "form-control" value={boxArt} onChange={(e) => setBoxArt(e.target.value)} type="text" />
                    <br />
                    {
                        errors.boxArt ?
                            <span>{errors.boxArt.message}</span>
                            : null
                    }
                </div>
 
                <div>
                    <label className="form-label">Quantity</label>
                    <input className = "form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" />
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
                </div> */}
                <button className="btn btn-primary m-1">Update Item</button>
        </form>
        </div>
        </div>
    )
}

export default EditGrocery;