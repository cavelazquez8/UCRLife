import {RequestHandler} from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getVerifiedUser: RequestHandler = async (req,res,next)=>{
    const verifiedUser = req.session.userID;

    try{
        const loggedUser = await UserModel.findById(verifiedUser).select("+email").exec();
        res.status(200).json(loggedUser);
    }
    catch(error){
        next(error);
    }
}

interface userSignUp{
    username?: string,
    //firstName?: string,
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
            throw createHttpError(400, "Please enter username, email, or password");
        }
        const existingUsername = await UserModel.findOne({username: username}).exec();
        
        if(existingUsername){
            throw createHttpError(409, "Username already taken. Please create a new one.");
        }

        const existingEmail = await UserModel.findOne({email: email}).exec();
        
        if(existingEmail){
            throw createHttpError(409, "Email already used. Please use another email.");
        }

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: hashPassword
        });

        req.session.userID = newUser._id;
        res.status(201).json(newUser);
    }
    catch(error){
        next(error);
    }
};  

interface loginBody{
    email: string,
    password: string,
}

export const login: RequestHandler<unknown,unknown, loginBody, unknown> = async (req,res,next) =>{
    const emailEnterd = req.body.email;
    const passwordEntered = req.body.password;

    try{
        if(!passwordEntered || !emailEnterd){
            throw createHttpError(400, "Missing email or password");
        }

        const validUser = await UserModel.findOne({email: emailEnterd}).select("+password +email").exec();
        if(!validUser){
            throw createHttpError(401,"Invalid email or password");
        }

        const samePassword = await bcrypt.compare(passwordEntered,validUser.password);
        if(!samePassword){
            throw createHttpError(401,"Invalid password");
        }

        req.session.userID = validUser._id;
        res.status(201).json(validUser);
    }
    catch(error){
        next(error);
    }
}

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};

export const getUser: RequestHandler = (req, res, next) => {
    const username = req.query.username;
    try{
        const user = UserModel.findOne({username:username});
        res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
}