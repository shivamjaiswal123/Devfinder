
import { Request, Response } from "express";
import { prisma } from "../config/prisma.config";
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Solve this issue in Cookies - Cross-Site Request Forgery

function jwtToken(user_id: string){
    const token = jwt.sign(
        {
            user_id
        },
        process.env.JWT_SECRET_KEY!!,
        { expiresIn: "1h" }
    );

    return token;
}

export const update = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;
        const { email, username, status, profile_photo } = req.body;

        if (!user_id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { user_id: user_id as string },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username },
                ],
            },
        });

        if (existingUser && existingUser.user_id !== user.user_id) {
            res.status(400).json({ message: 'Email or Username is already taken' });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { user_id: user.user_id },
            data: {
                email: email || user.email,
                username: username || user.username,
                status: status || user.status,
                profile_photo: profile_photo || user.profile_photo,
                updated_at: new Date(),
            },
        });

        res.status(200).json({
            message: 'User updated successfully!',
            user: {
                user_id: updatedUser.user_id,
                email: updatedUser.email,
                username: updatedUser.username,
                status: updatedUser.status,
                profile_photo: updatedUser.profile_photo,
                created_at: updatedUser.created_at,
                updated_at: updatedUser.updated_at,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user information', error });
    }
};

export const get = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { user_id: user_id as string },
            select: {
                user_id: true,
                email: true,
                username: true,
                status: true,
                profile_photo: true,
                created_at: true,
                updated_at: true,
                deleted_at: true
            },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if(user?.deleted_at!=null){
            res.status(404).json({ message: 'This user account has been deleted.' });
            return;
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user information', error });
    }
};

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

        const token=jwtToken(newUser.user_id)

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

        const token=jwtToken(existingUser.user_id);

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