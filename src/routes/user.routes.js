import { Router } from "express";
const router = Router();
import * as userController from "../controllers/user.controller.js"
import { body } from "express-validator"
router.post("/register",
    body('username')
    .isString()
    .withMessage('username must be a string')
    .isLength({ min: 3 })
    .withMessage('username must be at least 3 characters long')
    .isString({
        lowercase: true
    })
    .withMessage('username must be in lowercase'),

    body('email')
    .isEmail()
    .withMessage('Invalid email'),

    body('password')
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),

     userController.createUserController)




export default router;