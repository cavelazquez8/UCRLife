import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import messageModel from "../models/message";

const sendMessage: RequestHandler = async (req, res, next) => {
  const message = new messageModel({
    sender: req.body.sender,
    recipient: req.body.recipient,
    text: req.body.text
  });
  try {
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const messages = await messageModel.find({ recipient: req.query.recipient });
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export { sendMessage, getMessages };

