import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import offersRoutes from "./routes/offers"

const app = express();

app.use(express.json());

app.use("/api/offers", offersRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "unknown error ocurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({error:errorMessage});
});

export default app;