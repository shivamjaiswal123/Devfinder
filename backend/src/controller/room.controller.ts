import { Request, Response } from "express";
import { prisma } from "../config/prisma.config";

export const create = async ( req : Request, res : Response) => {
    try{
            //do authentication
            //do Validation
            const user_id  = req.user_id;
            const { name, description, visibility, github_link, max_users, tags } = req.body;

            const new_room = await prisma.room.create({
                data: {
                    user_id,
                    name,
                    description,
                    visibility,                               
                    github_link,
                    max_users,
                    tags
                }
            });
    
            res.status(201)
            .json({
                message: 'Room created successfully!', new_room,
            })
    
        }catch(e){
            console.error(e);
            //Status Code: 500 - Internal Server Error
            res.status(500).json({ message: "Error creating user", error: e });
        }
}