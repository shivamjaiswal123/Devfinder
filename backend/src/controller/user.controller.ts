
import { Request, Response } from "express";
import { prisma } from "../config/prisma.config";
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

function jwtToken(email: string){
    const token = jwt.sign(
        {
            email
        },
        process.env.SECRET_KEY!!,
        { expiresIn: "1h" }
    );

    return token;
}

export const signup = async (req: Request, res: Response) => {
    try{
        const {email,username,password} = req.body;

        const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email: email },
                { username: username },
              ],
            },
          });

        if (existingUser) {
            
            if(existingUser.email===email){
                //Staus Code 400 - Bad Request
                res.status(400).json({ message: 'User with this email already exists' });
                return;
            }
            
            res.status(400).json({ message: 'User with this username already exists' });
            return;
            
        }
        
        const hashedPassword = await bcrypt.hash(password,8);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,                               
                status: 'offline',
            }
        });

        const token=jwtToken(email)

        //Status Code: 201 - Created
        res.status(201)
        .cookie("accessToken", token)
        .json({
            message: 'User created successfully!',
            user: {
                user_id: newUser.user_id,
                email: newUser.email,
                username: newUser.username,
                status: newUser.status,
                created_at: newUser.created_at,
                updated_at: newUser.updated_at,
            }
        })

    }catch(e){
        console.error(e);
        //Status Code: 500 - Internal Server Error
        res.status(500).json({ message: "Error creating user", error: e });
    }
    
}

export const signin = async (req: Request, res: Response) => {
    try{
        const {email,password} = req.body;

        const existingUser = await prisma.user.findFirst({
            where: { email },
          });

        if (!existingUser) {
            res.status(400).json({ message: 'User does not exists!' });
            return;
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            res.status(400).json({ message: 'Password incorrect!' });
            return;
        }

        const token=jwtToken(email);

        //Status Code: 200 - Ok
        res.status(200)
        .cookie("accessToken", token)
        .json({
            message: 'User Signed in successfully!',
        });
    }catch(e){
        console.error(e);
        //Status Code: 500 - Internal Server Error
        res.status(500).json({ message: "Error creating user", error: e });
    }
}