import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

const authUser = async (req, res, next) => {
  try {
    // 1 Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    // 2 Check if token is blacklisted
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    // 3 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4 Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;