import { body } from "express-validator"
import redis from "../services/redis.service.js"

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