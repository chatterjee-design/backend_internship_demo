import  {Router } from "express";
import { createArticles, getOneArticle, getallArticles } from "../controller/articles.controller.js";


const articlesRouter = Router();

articlesRouter
.route("/")
.post( createArticles)
.get(getallArticles)

articlesRouter
.route("/:_id")
.get(getOneArticle)


export default articlesRouter;