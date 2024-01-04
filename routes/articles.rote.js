import  {Router } from "express";
import { createArticles, getallArticles } from "../controller/articles.controller.js";


const articlesRouter = Router();

articlesRouter
.route("/")
.post( createArticles)
.get(getallArticles)

articlesRouter
.route("/:id")


export default articlesRouter;