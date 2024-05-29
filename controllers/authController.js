import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJwt } from "../utils/token.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customError.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = createJwt({ id: user._id });

  // one day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // setting cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // expires in 1day
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new UnauthenticatedError("Email and password are required");
  }

  const user = await User.findOne({ email });

  const isValidUser = user && (await comparePassword(password, user.password));

  if (!isValidUser) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = createJwt({ id: user._id });

  // one day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // setting cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // expires in 1day
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ msg: `${user.name} logged in...`, token });
};

export const logout = (req, res) => {
  res
    .cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "User logged out successfully" });
};

export const profile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};
