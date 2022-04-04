//We export an object of key-value pairs from our controller.
//Rather than writing the ENTIRE function, we simply access it using GroceryController.findAllGroceries
    //(or whatever key corresponds with the route)
    const GroceryController = require("../controllers/grocery.controller");


    //app parameter gets app (express()) in server.js when invoked
module.exports= (app)=> {
//if data is only being read, we can use a GET HTTP Verb
app.get("/api/groceries", GroceryController.findAllGroceries);

//if data is being sent to my server to create a new document, we use a POST HTTP Verb
app.post("/api/groceries", GroceryController.createNewGrocery);

//Make sure calls with params go after the previous calls!    
app.get("/api/groceries/:id", GroceryController.findOneGrocery);

//The parameter id, as defined in the controller MUST MATCH
//what we defined it as in the controller!
app.delete("/api/groceries/:id", GroceryController.deleteOneGrocery);

app.put("/api/groceries/:id", GroceryController.updateGrocery);

}