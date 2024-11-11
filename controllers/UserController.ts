import { Request, Response } from "express";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";
import { RegisterUserDto, LoginUserDto, AuthResponseDto } from "../dtos/user";
import logger from "../utils/logger";
import {
  validateLoginUserInputs,
  validateRegisterUserInputs,
} from "../validations/userValidations";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validationErrors = validateRegisterUserInputs(req.body);
      if (validationErrors.length > 0) {
        res.status(400).json({ error: validationErrors });
        return;
      }
      const userData: RegisterUserDto = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({ user: user });
      logger.info("User was created successfully");
    } catch (error) {
      console.log("error:\n", error);
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validationErrors = validateLoginUserInputs(req.body);
      if (validationErrors.length > 0) {
        res.status(400).json({ error: validationErrors });
        return;
      }
      const userData: LoginUserDto = req.body;
      // From here:
      const authorizedUser: AuthResponseDto = await this.userService.loginUser(
        userData
      );
      res.status(200).json({
        message: "User logged in successfully",
        data: authorizedUser,
      });
      logger.info("User logged in successfully");
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}

export default UserController;
