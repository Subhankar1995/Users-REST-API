import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.jwtSecretKey || 'hidden'

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    console.log("authenticating token......");
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Missing token.' });
    }

    try {
        jwt.verify(token, jwtSecretKey);
        console.log("token is valid");
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}