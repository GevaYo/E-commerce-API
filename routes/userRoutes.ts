import { Router } from "express";
import { validateRequestStructure } from "../middlewares/requestValidation";
import UserController from "../controllers/UserController";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";
import { MySqlUserRepository } from "../repositories/mysql/MySqlUserRepository";
import { MySqlService } from "../services/db/mysql/MySqlService";

const registerFields = ["username", "email", "password"];
const loginFields = ["email", "password"];

const router = Router();
const authService = new AuthService();
const userRepository = new MySqlUserRepository(new MySqlService());
const userService = new UserService(userRepository, authService);
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
