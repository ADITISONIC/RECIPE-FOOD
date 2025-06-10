import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { email: newUser.email, id: newUser._id },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
   const {email,password} = req.body
   const user =  await User.findOne({email})
   if(!user){
    res.status(400).json({
      message:"Invalid credentials"
    })
   }
   const isPasswordMatch = await bcrypt.compare(password,user.password)
   if(!isPasswordMatch){
    res.status(400).json({
      message:"Invalid password"
    })
   }
   const token = jwt.sign({
    userId:user._id
   },'JWT_SECRET',{expiresIn:'1h'})
   res.status(200).json({
    success:true,
    token,
    userId:user._id
   })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Server error"
    })
  }
};
