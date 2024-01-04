import { Schema, model } from "mongoose";

const articlesSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        author: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        body: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
)

const Articles = model("Crud", articlesSchema);

export default Articles;