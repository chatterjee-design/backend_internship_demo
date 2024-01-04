import cookieParser from "cookie-parser";
import  express  from "express";
import {config } from "dotenv";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";

//config doten file
config()

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user/', userRouter)

//if page not found
app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 NOT FOUND');
})

//error handling/ if any error happens
app.use(errorMiddleware)

export default app;
