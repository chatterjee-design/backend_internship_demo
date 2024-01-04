import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: [true, "Email must be unique"],
            lowercase: [true, "Email must be in lowercase"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        age: Number,
        dob: String,
        hobbies: {
            type: [String],
            default: [],
        },
    }
)

//hashing the password
userSchema.pre("save", async function (next) {
    //if the password is not modified
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// compare the password against the hashed password
userSchema.methods = {
    comparePassword: async function (plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },

    //generate a jwt token for payload
    generateJWTToken: async function () {
        return await jwt.sign(
            {
                id: this.id,
                secret: this.secret,
                role: this.role,
                email: this.email,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );
    },
}

const User = model("User", userSchema);

export default User;