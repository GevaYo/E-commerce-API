import { Router } from "express";
import { validateRequestStructure } from "../middlewares/requestValidation";
import UserController from "../controllers/UserController";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";
import DatabaseService from "../services/db/DatabaseService";
import { log } from "console";

const registerFields = ["username", "email", "password"];
const loginFields = ["email", "password"];

const router = Router();
const authService = new AuthService();
const userService = new UserService(DatabaseService, authService);
const userController = new UserController(userService);

router.post(
  "/signup",
  validateRequestStructure(registerFields),
  userController.registerUser
); // POST /user/signup

router.post(
  "/login",
  validateRequestStructure(loginFields),
  userController.loginUser
); // POST /user/login

export default router;
