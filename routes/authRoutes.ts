import { Router } from "express";
import { validateUserRegistration } from "../utils/validation";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";
import DatabaseService from "../services/db/DatabaseService";
/**
 * /logout
 * /forgot-password
 * /reset-password
 */
const router = Router();
const authService = new AuthService();
const userService = new UserService(DatabaseService);
const authController = new AuthController(userService, authService);

router.post(
  "/signup",
  ...validateUserRegistration(),
  authController.registerUser
); // POST /user/signup

router.post("/login", authController.loginUser); // POST /user/login

export default router;
