import express from "express";
import { registerUserController,loginUserController,logoutUserController,getMeController } from "../controllers/authController.js"; 
import authUser from "../middlewares/authMiddleware.js";
const router = express.Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 **/
router.post("/register", registerUserController );

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
router.post("/login", loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
router.get("/logout", logoutUserController);


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
router.get("/get-me", authUser, getMeController);

export default router;