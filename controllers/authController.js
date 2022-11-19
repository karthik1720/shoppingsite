import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });
    await newUser.save();
    res
      .status(200)
      .json({ error: false, message: "User successfully created" });
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.json({ error: true, message: "User not found" });
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      res.json({ error: true, message: "Password is incorrect" });
    }
    const payload = {
      email: email,
      password: password,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWTSECRET);
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res
      .status(200)
      .json({ error: false, message: "User authenticated", token: token });
  } catch (error) {}
};
