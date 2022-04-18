const User = require ("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
// registering a user 
    register:(req,res)=>{
        
        const user = new User (req.body)
        
        user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Registration is Successful")
                res.json({
                    sucessMessage:"Thank you for reigstering",
                    user:newUser
                })
            })
            .catch((err)=>{
                console.log("registeration is not successful")
                res.status(400).json(err)
            })
    },
// Login User use cookie. 

    login:(req,res)=>{
        User.findOne({email:req.body.email})
            .then((userRecord)=>{
                // check if the user is registered in our system.
                if(userRecord === null){
                    res.status(400).json({message:"Invalid Creditals"})
                }
                else{
                    // email is found
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("password is valid");
                                res.cookie(
                                    "userToken",
                                    jwt.sign(
                                        {
                                            id:userRecord._id,
                                            email:userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires:new Date(Date.now()+ 9000000)
                                    }
                                ).json({
                                    message: "Login Suceessful",
                                    userLoggedIn: userRecord.username
                                });
                            }
                            else{
                                res.status(400).json({message:"Invalid Login Attempt"})
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({message:"Failed Login Attempt"});
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({message:"Invalid Login Attempt"});
            })
    },

    // Logout, clear the cookie

    logout:(req,res)=>{
        console.log("logging out")
        res.clearCookie("userToken");
        res.json({
            message:"You've sucessfully logged out"
        })
    },

    // getting a User that is logged In

    getLoggedInUser: (req, res)=>{

        // const decodedJWT = jwt.decode(req.cookies.usertoken,{
        //     complete: true
        // })

        User.findOne({_id: req.jwtpayload.id})
            .then((user)=>{
                console.log(user);
                res.json(user)
            })
            .catch((err)=>{
                console.log(err);
            })

    }


    
}
