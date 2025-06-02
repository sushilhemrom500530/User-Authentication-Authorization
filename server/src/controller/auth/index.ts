import { Request, Response } from 'express';

const Signup =  async (req: Request, res: Response) => {
    return res.status(201).json({ message: 'User registered' });
  }

 const Signin =async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User signed in' });
  }


export const authController = {
    Signin,
    Signup
};
