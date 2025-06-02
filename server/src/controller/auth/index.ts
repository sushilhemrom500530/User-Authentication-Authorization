import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import User from "../../models/User";
import config from '../../config';

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const sendError = (res: Response, status: number, message: string) =>
  res.status(status).json({ message });

export const Signup = async (req: Request, res: Response) => {
  try {
    const { username, password, shops } = req.body;

    if (!passwordRegex.test(password)) {
      return sendError(
        res,
        400,
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
    }

    if (!Array.isArray(shops) || shops.length < 3) {
      return sendError(res, 400, "At least 3 shop names are required.");
    }

    if (await User.findOne({ username })) {
      return sendError(res, 400, "Username is already taken.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      shops,
    });

    return res.status(201).json({
      message: "User created successfully.",
      data: {
        id: newUser._id,
        username: newUser.username,
        shops: newUser.shops,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return sendError(res, 500, "Something went wrong. Please try again.");
  }
};

export const Signin = async (req: Request, res: Response) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      return sendError(res, 400, "Username and password required");
    }

    const user = await User.findOne({ username });
    if (!user) {
      return sendError(res, 401, "User not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return sendError(res, 401, "Incorrect password");
    }

    const expiresIn = rememberMe ? "7d" : "30m";
    const token = jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, { expiresIn });

    return res.status(200).json({
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return sendError(res, 500, "Server error");
  }
};

export const authController = {
  Signin,
  Signup,
};
