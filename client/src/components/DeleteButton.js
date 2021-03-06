import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'



const DeleteButton = (props)=>{

    const {deleteHandler} = props;

    return(
        <Button variant="danger" size="sm"onClick={deleteHandler}>Delete</Button>
    )
}


export default DeleteButton;