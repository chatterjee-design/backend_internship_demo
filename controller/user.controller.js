import User from "../model/user.model.js";
import AppError from "../utils/app.error.js";

//set cookieOptions for jwt token
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    httpOnly: true,
    sameSite: 'None', // Required for cross-origin cookies
    secure: true, 
  };

//registration
const register = async (req, res, next) =>{
try {
    const { fullname, email, password, age, dob, hobbies } = req.body;

    //if any fields are empty
    if (!fullname || !email || !password || !age || !dob || !hobbies) {
      return next(new AppError("All fields are required 🙄", 400));
    }

     // Check if the user is already registered
     const userExists = await User.findOne({ email });
     if (userExists) {
       return next(new AppError("User already exists 😒", 400));
     }

      // Create a new user instance with hobbies
    const user = await User.create({
        fullname,
        email,
        password,
        age,
        dob,
        hobbies,
    });

     //if any prblm while creating a new user
    if (!user) {
        return next(
          new AppError("User registration failed, please try again 🫥", 400)
        );
    }

     //generating the jwt token
     const token = await user.generateJWTToken();
     user.password = undefined; //set the password undefined
     res.cookie("token", token, cookieOptions);//set the token into the cookie
 
     //if everything is fine
     res.status(200).json({
       success: true,
       message: "User successfully registered",
       data : user
     });

} catch (error) {
    console.log(error.message)
    return next(new AppError("Internal Server Error", 500));
}
}

//login function
const login = async (req, res, next) =>{
    try {
        const { email, password} = req.body;

        //if any fields are empty
        if ( !email || !password ) {
           return next(new AppError("All fields are required 🙄", 400));
         }
   
       //find the user using the email and password fields
       const user = await User.findOne({ email }).select("+password");

   
       //if there is no user
       if (!user) {
           return next(new AppError("Invalid Credential", 400));
       }
   
       //compare the password (hashed) in userschema
       if (!(await user.comparePassword(password))) {
           return next(new AppError("Invalid Credential", 401));
         }
       
        //if everything is fine
       //generate token
       const token = await user.generateJWTToken();
       user.password = undefined;
       res.cookie("token", token, cookieOptions);
   
       res.status(200).json({
         success: true,
         message: "User successfully logged in",
         user,
       });

    } catch (error) {
        return next(new AppError("Internal Server Error", 500));
        
    }
}

export {register, login}