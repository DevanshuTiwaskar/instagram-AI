import { Router } from "express";
const router = Router();
import * as userController from "../controllers/user.controller.js";
import * as userMeddleware from "../middlewares/user.middleware.js";



router.post(
  "/register",
  userMeddleware.registerUserValidation,
  userController.createUserController
);



router.post("/login",
   userMeddleware.loginUserValidation,
    userController.loginUserController);
export default router;
