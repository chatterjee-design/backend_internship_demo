import Articles from "../model/articles.model.js";
import AppError from "../utils/app.error.js";

const createArticles = async (req, res, next)=>{
    try {
        const { title, description, author, body } = req.body;

        //if any fields are empty
        if (!title || !description || !author || !body ) {
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

export {createArticles, getallArticles}