import  {Router } from "express";
import { createArticles, deleteArticles, getOneArticle, getallArticles, updateArticle } from "../controller/articles.controller.js";


const articlesRouter = Router();

articlesRouter
.route("/")
.post( createArticles)
.get(getallArticles)

articlesRouter
.route("/:_id")
.get(getOneArticle)
.put(updateArticle)
.delete(deleteArticles)


export default articlesRouter;