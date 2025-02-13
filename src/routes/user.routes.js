import { Router } from "express";
const router = Router();
import * as userController from "../controllers/user.controller.js";
import * as userMeddleware from "../middlewares/user.middleware.js";



router.post("/register",
  userMeddleware.registerUserValidation,
  userController.createUserController
);



router.post("/login",
    userMeddleware.loginUserValidation,
    userController.loginUserController
  );



router.get("/profile",userMeddleware.authUser,(req,res)=>{
  res.json(req.user)
})  


router.get("/logout",
   userMeddleware.authUser,
   userController.logoutUserController
)








    export default router;
