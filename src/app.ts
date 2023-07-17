import express,{ Application, NextFunction, Request, Response } from "express";
import userRouter from "./router/UserRouter";

const app: Application = express();
app.use(express.json());

app.use('/api/users', userRouter);

app.use('*', (req: Request, res: Response) => {
    res.status(404).send('invalid url');
})

export default app;