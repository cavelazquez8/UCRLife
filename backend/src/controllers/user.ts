import {RequestHandler} from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

interface userSignUp{
    username?: string,
    firstName?: string,
    email?: string,
    password?: string,
}

export const usersignup: RequestHandler<unknown,unknown, userSignUp, unknown> = async (req, res, next) => {
    const username = req.body.username;
    //const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    try{
        if(!username || !email || !password){
            throw createHttpError(400, "Parameters missing");
        }
        const existingUsername = await UserModel.findOne({username: username}).exec();
        
        if(existingUsername){
            throw createHttpError(409, "Username already taken. Please create a new one.");
        }

        const existingEmail = await UserModel.findOne({email: email}).exec();
        
        if(existingEmail){
            throw createHttpError(409, "Email already used. Please use another email.");
        }

        //const hashPassword = await bcrypt.hash(password,10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: password
        });
        res.status(201).json(newUser);
    }
    catch(error){
        next(error);
    }
};  
