import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SEC_KEY);
  return token;
};

const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SEC_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

export { generateAuthToken, authenticateJWT };
