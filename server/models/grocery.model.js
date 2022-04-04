const mongoose = require("mongoose");


const GrocerySchema = new mongoose.Schema({

    // an _id field is AUTOMATICALLY created each time we add a new document


    name: {
        type: String,
        //Our validatoions are defined right here in our schema
        //Most take two values, the criteria and the message!
        required: [true, "Item name is required"],
        //maxlength and minlength are for Strings, max/min are for number types
        maxlength: [30, "The name length can not be no more than 30 characters!"]
    },

    type:{
        type: String,
        //An enum will require this field's value in the request to 
        //include one of these values EXACTLY as typed here
        required: [true, "Item type is required!!!"],
        enum:[
            "Produce",
            "Canned Goods",
            "Baking/Spices",
            "Household Goods",
            "Beverages",
            "Frozen Foods",
            "Documentary",
            "Paper/Plastic",
            "Bread/Grains",
            "Condiments",
            "Snacks",
            "Meat/Protein",
            "Dairy",
            "Toiletries",
            "Pet Care",
        ]
    },


    boxArt: { //url of image from internet
        type: String,
        //The messages from validators will be accessible after we set our
    //res.status(400).json(err) in our controller
        required: [true, "He/She won't know unless there is a picture"]
    },


    quantity:{
        type: Number
    },
    //timestamps automatically create "createdAt" and"updatedAt" date and time info for each document
//everytime a doc is updated, it will change the "updatedAt"

}, {timestamps:true})


//The Model is a combination of the:
//1. Collection name which will be a singular, capitalized version of the collection name that's held in the db (will show in our db as "groceries")
//2. The Schema 

const Grocery = mongoose.model("Grocery", GrocerySchema);


//Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.


//We export the model to be imported and used in our controller. We will write Movie.find({}) for example to find all documents inside of the movie collection we've created!


module.exports = Grocery;