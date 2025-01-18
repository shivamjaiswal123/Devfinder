import { NextFunction, Request, Response } from "express";
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3,"Minimum length: 3"),
  password: z.string().min(6,"Minimum length: 6"),
});

export const inputValidationMiddleware = (req: Request, res: Response, next:NextFunction) => {
    try {
        signupSchema.parse(req.body);
        next();
      } catch (error) {
        res.status(400).json({ message: error });
      }
}