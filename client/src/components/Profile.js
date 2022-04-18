import React, {useState, useEffect} from "react";
import  {useParams} from "react-router-dom";
import axios from "axios";

const Profile = (props) =>{
    const {username} = useParams();

    const [userGroceryList, setGroceryUserList] = useState([]);


useEffect(()=>{
    axios.get(`http://localhost:8000/api/groceriesbyuser/${username}`,
        { withCredentials: true }
    )
        .then((res)=>{
            console.log(res.data);
            setGroceryUserList(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    


}, [])


    return (
        <div style={{textAlign: "center"}}>
            <h1>Welcome {username}</h1>

{
    userGroceryList.map((grocery, index) => (
        <div key={index}>
            <p>{grocery.name}</p>
            <p>{grocery.type}</p>
            <p>{grocery.quantity}</p>
        </div>
    ))
}
        </div>
    )
}

export default Profile;
