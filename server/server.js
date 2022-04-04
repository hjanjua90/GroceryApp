//This order is necessary! Don't move things around.
const express = require("express");
const cors = require("cors");
const app = express();


//This parses incoming requests with JSON payloads.
//Allows us to recongnize Request Object as a JSON Object.
app.use(express.json())
//This parses incoming requests with JSON payloads consisting of STRINGS OR ARRAYS.
    //Allows us to recongnize Request Object as a strings or arrays.
app.use(express.urlencoded({extended:true}))


//This lets our front-end at port 3000 make calls to our back-end at port 8000.
//Taking it away will result in "cors errors" when attemptnig your axios calls!
//This security feature is built into the browser. That's why we don't experience it in Postman.
app.use(cors({
    origin: "http://localhost:3000"
}))


require("./config/mongoose.config")

require("./routes/grocery.routes")(app)
// Longhand:
// const movieRoutes = require("./routes/movie.routes");
// movieRoutes(app);


//After connecting to our port (8000), this console.log lets us know we're connected to our server.
app.listen(8000, ()=>console.log("You are connected to port 8000"))