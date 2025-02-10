import userModel from '../models/user.js';
import { validationResult } from 'express-validator';


export const createUserController = async (req,res)=>{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }



    console.log(req.body)
    res.send("register")
}



