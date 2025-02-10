import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


const userSchema = new mongoose.Schema({   ///where new for creating new schema
   username:{
    type:String,
    required: [true,"Please provide a username"],
    unique: [true,"Username already exists"],
    trim: true,
    lowercase: true,
    minLength: [3,"Username must be at least 3 characters long"],
    maxLength: [20,"Username must be at most 20 characters long"]
   },
   

   email:{
    type:String,
    required: [true,"Please provide an email"],
    unique: [true,"Email already exists"],
    trim: true,
    lowercase: true,
    minLength: [3,"Email must be at least 3 characters long"],
    maxLength: [50,"Email must be at most 50 characters long"]
   },

   profileImage:{
    type:String,
    default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
   },

   password:{
    type:String,
   }

})

//"userschema.statics" defines functions that operate on the entire "User" model itself,
//  while "userschema.methods" defines functions that operate on individual "User" documents

userSchema.statics.hashPassword = async function(password){//statics is used to define a function that operates on the entire model
   if(!password){  ///password is required
       throw new Error("password is required")
   }
   
   
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password,salt)
}

userSchema.methods.comparePassword = async function(password){//methods is used to define a function that operates on individual documents
    if(!password){  ///password is required
        throw new Error("password is required")
    }
    
    if(!this.password){//if password is not there
        throw new Error("password is required")
    }
    
    
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateToken = function(){
    const token =  jwt.sign(
        {
            ////this is the user all the properties of the user will be stored in the token useing methods function
            _id:this._id,              
            username:this.username,
            email:this.email
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRE_IN
        })
        
        return token
}

userSchema.statics.verifyToken = function(token){
if(!token){
    throw new Error("token is required");
}
    

    return jwt.verify(token, config.JWT_SECRET)
}


const userModel = mongoose.model("user",userSchema)


export default userModel; 