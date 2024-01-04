import  {Router } from "express";
import { login, register } from "../controller/user.controller.js";

const userRouter = Router();


//post routes for create user or login user
userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter;