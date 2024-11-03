import { Request, Response } from "express";
import AuthService from "../services/auth/AuthService";
import UserService from "../services/auth/UserService";

class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const { password, ...userWithoutPassword } =
        await this.userService.createUser(userData);
      res
        .status(201)
        .json({ message: "User registered successfully", userWithoutPassword });
    } catch (error) {
      console.log("error:\n", error);
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email: userEmail, password: userPassword } = req.body;
    try {
      // Find user by email
      const user = await this.userService.findUserByEmail(userEmail);

      // Extract password and user data
      if (!user) {
        this.sendInvalidCredentials(res, "Email");
        return;
      }

      const { password: hashedPassword, ...userWithoutPassword } = user;

      // Verify password
      const isPasswordValid = await this.authService.comparePasswords(
        userPassword,
        hashedPassword
      );

      if (!isPasswordValid) {
        this.sendInvalidCredentials(res, "Password");
        return;
      }

      // Generate token and send success response
      const token = await this.authService.generateToken(userWithoutPassword);
      res.status(200).json({
        message: "User logged in successfully",
        userWithoutPassword,
        token,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  // Helper method for invalid credentials response
  private sendInvalidCredentials(
    res: Response,
    failureReason: "Email" | "Password"
  ): void {
    res.status(401).json({ message: `Invalid Credentials [${failureReason}]` });
  }
}

export default AuthController;
