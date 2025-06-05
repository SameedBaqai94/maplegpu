
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    response: string | JwtPayload; // Keep original 'response' property
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as CustomRequest).response = decoded; // Store decoded token data
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};