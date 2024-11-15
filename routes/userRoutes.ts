import { Router } from "express";
import { validateRequestStructure } from "../middlewares/requestValidation";
import UserController from "../controllers/UserController";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";
import { MySqlUserRepository } from "../repositories/mysql/MySqlUserRepository";
import { MySqlService } from "../services/db/mysql/MySqlService";
import authorize from "../middlewares/authorization";
import { UserRole } from "../models/user";
import authentication from "../middlewares/authentication";

const registerFields = ["username", "email", "password"];
const loginFields = ["email", "password"];

const router = Router();
const authService = new AuthService();
const userRepository = new MySqlUserRepository(new MySqlService());
const userService = new UserService(userRepository, authService);
const userController = new UserController(userService);

router.get(
  "/users",
  authentication,
  authorize([UserRole.ADMIN]),
  userController.getUsers
);
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
