import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";

const Edit = (props) =>{
    const[editGrocery, setEditGrocery] = useState({
        name:"",
        type:"",
        quantity:"",
        boxArt:"",
    })

    const [errors, setErrors] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/groceries/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setEditGrocery(res.data);
            })
            .catch((err)=>console.log(err))
    },[id])

    const editSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/groceries/${id}`,
        editGrocery    
        )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) =>{
                console.log(err);
                console.log(err)
                console.log("err.response:", err.response);
                console.log("err.response.data:", err.response.data);
                console.log("err.response.data.errors:", err.response.data.errors);
                setErrors(err.response.data.errors);
            } )
    }
    const onChangeHandler = (e) =>{

        const newStateObject = {...editGrocery};
        newStateObject[e.target.name] = e.target.value;
            // title = e.target.value
            console.log("e.target.name = ", e.target.name);
            console.log("e.target.value = ", e.target.value);
            setEditGrocery(newStateObject)
}

    return (
        <div>
            <Header
                titleText={"Update Item"}
                link={"/"}
                linkText={"Return to Dashboard"}
            />
            <Form
            submitHandler={editSubmitHandler}
            grocery={editGrocery}
            errors={errors}
            buttonText={"Update Item"}
            onChangeHandler={onChangeHandler}
            />
        </div>
    )
}

export default Edit;