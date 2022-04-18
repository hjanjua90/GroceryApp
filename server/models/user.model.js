const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, " is required"]
    },

    email: {
        type: String,
        required: [true, " is required"]
    },

    password: {
        type: String,
        required: [true, " is required"],
        minLength: [8, "Passwords MUST be at least 8 characters"]
    }

},{timestamps: true})


// virtual field for confirm password. Confirm password does not need to be store in the database. 

    UserSchema.virtual("confirmPassword")
        .get(()=>this._confirmPassword)
        .set((value)=>this._confirmPassword = value)

    // mongoose middlewear is used to take data in and processes it gives it to a function &/ api.NEXT allows us to move from middlewear to middle wear
    // pre middlewear
    UserSchema.pre("validation", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password must match!")
        console.log("Password do not match")
    }
    next()
})


// hash password before its saved in the database, number is the salt

// give our password the value of the return hash


UserSchema.pre("save", function(next){
    console.log("in pre save")
    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{
            this.password = hashedPassword;
            next();

        })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;