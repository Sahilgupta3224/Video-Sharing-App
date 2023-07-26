import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const signup = async(req,res,next)=>{
    try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("Aapka Swagat Hai");
  } catch (err) {
    next(err)
  }
};

export const signin = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      throw ErrorMessage(401, "Invalid");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw ErrorMessage(401, "Invalid");
    }
    const token = jwt.sign(
      { userId: user._id, username: user.name }, 
      "124421",
    );
    res.status(200).json(`User ${name} is signed in!`);
  } catch (err) {
    next(err);
  }
}
