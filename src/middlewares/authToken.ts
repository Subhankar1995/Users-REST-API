import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const jwtSecretKey = process.env.jwtSecretKey || 'hidden'

/**
 * @description 
 * This middelware function verify JWT token
 * Token must be present in request header's Authorization
 */
export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Missing token.' });
    }

    try {
        jwt.verify(token, jwtSecretKey);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}