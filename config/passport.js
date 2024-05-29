import { Strategy as JwtStrategy } from "passport-jwt";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

export const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id).select("-password");
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
});
