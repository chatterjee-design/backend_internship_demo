import Articles from "../model/articles.model.js";
import AppError from "../utils/app.error.js";

const createArticles = async (req, res, next) => {
    try {
        const { title, description, author, body } = req.body;

        //if any fields are empty
        if (!title || !description || !author || !body) {
            return next(new AppError("Every fields are required", 400));
        }


        //if the article is already exist
        const alreadyExists = await Articles.findOne({ title });
        if (alreadyExists) {
            return next(new AppError("Article is already exist", 400));
        }

        //create a new article
        const article = await Articles.create({
            title,
            description,
            author,
            body
        })

        //if any prblm while creating a article
        if (!article) {
            return next(new AppError("Please try again", 400));
        }

        //if everything is fine
        res.status(200).json({
            success: true,
            message: "article created successfully ",
            data: article,
        });


    } catch (error) {
        console.log(error.message)
        return next(new AppError("Internal Server Error", 500));
    }
}

//getallArticles
const getallArticles = async (req, res, next) => {
    try {
        const article = await Articles.find({});

        if (!article) {
            return next(new AppError("please create a new article", 400));
        }

        //if everything is fine
        res.status(200).json({
            success: true,
            message: "articles get successfully ",
            article,
        });

    } catch (error) {
        console.log(error.message)
        return next(new AppError("Internal Server Error", 500));
    }
}

//getOneArticle
const getOneArticle = async (req, res, next) => {
    try {
        const id = req.params._id

        //get article details from the params
        const article = await Articles.findById(id);

        //id and article not found
        if (!article) {
            return next(new AppError(" article not found with this id", 400));
        }

        //if everything is fine
        res.status(200).json({
            success: true,
            message: "article get successfully ",
            article,
        });
    } catch (error) {
        console.log(error.message)
        return next(new AppError("Internal Server Error", 500));
    }
}

//update article
const updateArticle = async (req, res, next) => {

    try {
        const { title, description, author, body } = req.body;

        //get article id from the params
        const id = req.params._id;
        const article = await Articles.findByIdAndUpdate(id);

        //if the article is already exist
        const alreadyExists = await Articles.findOne({ title });
        if (alreadyExists) {
            return next(new AppError("Article is already exist", 400));
        }

        //if there is no article
        if (!article) {
            return next(new AppError("article doesn't exist", 400));
        }

        //if req.body then update it
        if (title) {
            if (alreadyExists) {
                return next(new AppError("Name of the article is already exists", 404));
            }
            article.title = title;
        }
        if (author) {
            article.author = author
        }
        if (body) {
            article.body = body
        }
        if (author) {
            article.description = description
        }

        //save in db
        await article.save()

        res.status(200).json({
            success: true,
            message: "Article Details has been Updated😊",
            data: article,
        });

    } catch (error) {
        console.log(error.message)
        return next(new AppError("Internal Server Error", 500));
    }

}

//delete articles
const deleteArticles = async (req, res, next) => {
    try {
        const id = req.params._id

        //get article details from the params
        const article = await Articles.findByIdAndDelete(id);

        //if there is no article
        if (!article) {
            return next(new AppError("article doesn't exist", 400));
        }

        //if everything is fine
        res.status(200).json({
            success: true,
            message: "article deleted successfully ",
        });

    } catch (error) {
        console.log(error.message)
        return next(new AppError("Internal Server Error", 500));
    }
}

export { createArticles, getallArticles, getOneArticle, updateArticle, deleteArticles }