import { RequestHandler } from "express";
import conversationModel from "../models/Conversation"

export const addConversation: RequestHandler = async (req, res, next) => {
    const newConversation = new conversationModel({
        users: [req.body.senderId, req.body.recipientId],
    });
    try{
        const storeConversation = await newConversation.save();
        res.status(200).json(storeConversation);
    }
    catch(error){
        next(error);
    }
}

export const userSpecificConversation: RequestHandler = async(req,res,next) =>{
    try{    
        const currentConversation = await conversationModel.find({
            users:{$in: [req.params.userId]},
        });
        res.status(200).json(currentConversation);
    }
    catch(error){
        next(error);
    }
}