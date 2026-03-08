import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @route POST /api/auth/register
 * @access Public
 **/

const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //1.) Check empty
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    //2.) Check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Registered",
      });
    }

    //3.) hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //4.) Create new User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //5.) Generate token
    const token = generateToken(user._id);

    //6.) Store token in cookie
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    //7.) send response with user
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @route POST /api/auth/login
 * @access Public
 **/
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //1.) Check empty
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    //2.) Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email and Password",
      });
    }

    //3.) compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid Email and Password",
      });
    }

    //4.) Generate token
    const token = generateToken(user._id);

    //5.) Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    //6.) send response with user
    res.status(201).json({
      success: true,
      message: "user LoggedIn successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @route GET /api/auth/logout
 * @access public
 **/
const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token",{
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "user logged out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @route GET /api/auth/get-me
 * @access  private
 */
const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
