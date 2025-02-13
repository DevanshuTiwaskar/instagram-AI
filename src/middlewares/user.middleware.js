import { body } from "express-validator"
import redis from "../services/redis.service.js"
import userModel from "../models/user.js"

export const registerUserValidation = [
     body('username')
        .isString()
        .withMessage('username must be a string')
        .isLength({ min: 3 })
        .withMessage('username must be at least 3 characters long')
        .custom((value)=> value === value.toLowerCase()) 
        .withMessage('username must be in lowercase'),
    
        body('email')
        .isEmail()
        .withMessage('Invalid email'),
    
        body('password')
        .isString()
        .withMessage('password must be a string')
        
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
    
]


export const loginUserValidation =[
        body('email')
        .isEmail()
        .withMessage('Invalid email'),
    
        body('password')
        .isString()
        .withMessage('password must be a string')

        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
]


export const authUser = async (req,res,next)=>{
   try {

        // console.log("Headers:", req.headers);

        // console.log("Authorization Header:", req.headers.authorization);

         const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);


         if(!token){
                return res.status(401).json({ message:'Unauthorized token' });
         }

         const isTokenBlackListed = await redis.get(`blacklist${token}`)
         if(isTokenBlackListed){
                return res.status(404).json({ message: 'blacklist Unauthorized' })
         }

         const decoded = userModel.verifyToken(token)//here we get all genareted data which is storge in a token 
         
         let user = await  redis.get(`user:${decoded._id}`)// we genareted id in token 


         if(user){
                user = JSON.parse(user)//user show in json 
         }
       
          if(!user){
                user = await userModel.findById(decoded._id)///if user not get then find in mongodb 
                if(!user){
                        delete user._doc.password
                        await redis.set(`user:${decoded._id}`, json.stringify(user))///if user get than set in redis 
                }else{
                        return res.status(401).json({message: 'Unauthorized'})
                }
          }


          req.user = user;
          req.tokenData = { token, ...decoded };

        return next();

   } catch (error) {
        console.log(error);
        res.status(401).json({message: error.message})
   }
}

