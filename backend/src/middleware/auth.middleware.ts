import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface CustomJwtPayload extends JwtPayload {
    user_id: string;  // Adjust the type depending on your implementation
}

declare global {
    namespace Express {
        interface Request {
        user_id: string;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    const token =req.cookies.accessToken;

    if (!token) {
        res.status(200)
            .json(
                {
                    success: false,
                    message: "Error!Token was not provided."
                }
            );
        return
    }

    try{
        const decodedToken =jwt.verify(token, process.env.JWT_SECRET_KEY!!) as CustomJwtPayload;
        req.user_id=decodedToken.user_id;
        next() 
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Error decoding token", error: e });
    }    
     
}