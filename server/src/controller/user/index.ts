import { Request, Response } from "express";
import User from "../../models/User"


const getAllFromDB = async(req:Request,res:Response)=>{
    const result = await User.find();
    res.send({
        message:"User rettrieve successfully",
        data:result
    })
}

export const UserController = {
    getAllFromDB
}