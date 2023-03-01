import createHttpError from "http-errors";
import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
    if (req.session.userID) {
        next();
    } else {
        next(createHttpError(401, "No authenticated user"));
    }
};