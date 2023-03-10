import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import offersRoutes from "./routes/offers";
import favoriteRoutes from "./routes/favoriteOffers";
import messagesRoutes from "./routes/message";
import conversationRoutes from "./routes/conversation";
import userRoutes from "./routes/user";
import morgan from "morgan";
import createHttpError , { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requireAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.session_sec,
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));
app.use("/api/offers",  requireAuth, offersRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/message", messagesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "unknown error ocurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error:errorMessage});
});

export default app;