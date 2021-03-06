const Grocery = require("../models/grocery.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");




    module.exports = {


        findAllGroceries:(req, res)=>{
            Grocery.find()
                .populate("createdBy", "username email")
                .then((allGroceries)=>{
                    console.log(allGroceries);
                    res.json(allGroceries)
                })
                .catch((err)=>{
                    console.log("finding allGroceries failed");
                    res.json({message:"Something went wrong in findAll", error: err})
                })

        },

        createNewGrocery: (req, res)=>{
            const newGroceryObject = new Grocery(req.body);
            console.log(req.body)

            const decodedJWT = jwt.decode(req.cookies.userToken,{
                complete:true
            })

            newGroceryObject.createdBy = decodedJWT.payload.id;

            newGroceryObject.save()
            
                .then((newGrocery)=>{
                    console.log(newGrocery);
                    res.json(newGrocery);
                })
                .catch((err)=>{
                    console.log("Something went wrong in createNewGrocery");
                    //We set the response status of 400 to 
                    //display our err, which is the rejection of our promise.

                //A 400 status means our client is talking 
                    //to our server just fine, but the client isn't sending good info.


                //A 404 status error means the client's 
                    //request isn't to the right place or your server is not set up properly

                // a status of 200 means we are looking good!
                    res.status(400).json(err)
                })
        },

        findOneGrocery: (req, res)=>{
                    //We use the paramater's (params) or the client's request to search for a
            //specific document by the field (here _id) specified
            Grocery.findOne({ _id: req.params.id })//the params id MUST MATCH how we write it in our routes!!!
                .then((oneGrocery)=>{
                    console.log(oneGrocery);
                    res.json(oneGrocery);
                })
                .catch((err)=>{
                    console.log("Find One Grocery failed");
                    res.json({ message: "Something went wrong in findOneGrocery", error: err })
                })
        },

        deleteOneGrocery: (req, res)=>{
            Grocery.deleteOne({_id: req.params.id})
                .then((deletedGrocery)=>{
                    console.log(deletedGrocery);
                    res.json(deletedGrocery);
                })
                .catch((err)=>{
                    console.log("delete One Grocery failed");
                    res.json({ message: "Something went wrong in deleteOneGrocery", error: err })
                })
        },


        updateGrocery: (req, res)=>{
            //This Mongoose query requires both a parameter AND body from the request!
            Grocery.findOneAndUpdate({_id: req.params.id},
                req.body,
                //These options return a new doc and allow schema valids to run on PUT req
                {new: true, runValidators: true}
                )
                .then((updatedGrocery)=>{
                    console.log(updatedGrocery)
                    res.json(updatedGrocery)
                })
                .catch((err)=>{
                    console.log("Something went wrong in updateGrocery");
                    res.status(400).json(err) //See above (explained in create)
                })
        },
        findAllGroceriesByUser: (req, res)=>{

            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");

                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn)=>{
                        Grocery.find({createdBy: userNotLoggedIn._id})
                            .populate("createdBy", "username")
                            .then((allGroceriesFromUser)=>{
                                console.log(allGroceriesFromUser);
                                res.json(allGroceriesFromUser);
                            })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Grocery.find({ createdBy: req.jwtpayload.id })
                    .populate("createdBy", "username")
                    .then((allGroceriesFromLoggedInUser) => {
                        console.log(allGroceriesFromLoggedInUser);
                        res.json(allGroceriesFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }

        }



    }