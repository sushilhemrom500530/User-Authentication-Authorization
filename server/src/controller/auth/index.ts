import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import User from "../../models/User";

const Signup = async (req: Request, res: Response) => {
  try {
    const { username, password, shops } = req.body;

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
      return res.status(400).json({ message: "Weak password" });
    }

    if (!Array.isArray(shops) || shops.length < 3) {
      return res
        .status(400)
        .json({ message: "At least 3 shop names required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username taken" });

    // Ensure global uniqueness of shops
    const conflict = await User.findOne({ shops: { $in: shops } });
    if (conflict)
      return res
        .status(400)
        .json({ message: "One or more shop names already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      shops,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
  }
};

const Signin = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "User signed in" });
};

export const authController = {
  Signin,
  Signup,
};
