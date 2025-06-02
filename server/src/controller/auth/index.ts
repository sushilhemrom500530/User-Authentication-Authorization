import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import User from "../../models/User";

export const Signup = async (req: Request, res: Response) => {
  try {
    const { username, password, shops } = req.body;

    // Validate password strength
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password too weak. It must be at least 8 characters long and include at least one number and one special character." });
    }

    // Validate shop
    if (!Array.isArray(shops) || shops.length < 3) {
      return res.status(400).json({ message: "At least 3 shop names are required." });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      shops,
    });

    return res.status(201).json({
      message: "User created successfully.",
      data: {
        id:newUser?._id,
        username:newUser?.username,
        shops:newUser?.shops
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};


const Signin = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "User signed in" });
};

export const authController = {
  Signin,
  Signup,
};
