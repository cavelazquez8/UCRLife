import { RequestHandler } from "express";
import createHttpError from "http-errors";
import messageModel from "../models/message";
import userModel from "../models/user";

export const sendMessage: RequestHandler = async (req, res, next) => {
  const newMessage = new messageModel(req.body);
  try{
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  }
  catch(error){
    next(error);
  }
}

export const getMessages: RequestHandler = async (req, res, next) => {
  try{
    const currentUserMessages = await messageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(currentUserMessages);
  }
  catch(error){
    next(error);
  }
}
/*export const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    const currentUser = req.session.userID;
    if(!currentUser){
      throw createHttpError(401,"Please login to send message");
    }
    const user = await userModel.findById(currentUser).select("+username");
    const message = new messageModel({
      sender: user.username,
      recipient: req.body.recipient,
      text: req.body.text
    });
    if(!message.recipient || !message.sender){
      throw createHttpError(401, "User does not exist");
    }
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const currentUser = req.session.userID;
    const reciever = req.body.recipient;
    if(!currentUser){
      throw createHttpError(401, "Please login to see messages");
    }
    const user = await userModel.findById(currentUser).select("+username");
    const messages = await messageModel.find({$or:[{ sender: user.username, recipient: reciever},{sender: reciever, recipient: user.username }]}).sort({"timestamp":-1}).exec();
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const getUserInteractions: RequestHandler = async (req,res, next) =>{
    try{
      const currentUser = req.session.userID;
      if(!currentUser){
        throw createHttpError(401, "Please login to see your messages");
      }
      const user = await userModel.findById(currentUser).select("+username");
      if(!user.username){
        throw createHttpError(401, "Username does not exist");
      }
      /*const userRecievers = await messageModel.find({"$where": "this. username IN (select distinct sender  from messageModel where recipient  == this. currentUser.username  UNION  select distinct recipient from message where sender = currentUser.username"
    },{
       "username": 1
    });
    const userRecievers = await messageModel.find({$or:[{ sender: user.username},{recipient: user.username }]});
    //const userRecievers = await userModel.aggregate([{
        $lookup:{
            from: "messageModel"
        //}
    //}])
      res.status(200).json({userRecievers});
    }
    catch(error){
      next(error);
    }
  
};*/

