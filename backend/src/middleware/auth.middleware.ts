import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

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
        const decodedToken =jwt.verify(token, process.env.SECRET_KEY!!);
        next() 
        // res.status(200).json({success: true});
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Error decoding token", error: e });
    }    
     
}