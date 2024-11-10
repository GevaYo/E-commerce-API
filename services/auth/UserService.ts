import DatabaseService from "../db/DatabaseService";
import AuthService from "./AuthService";
import logger from "../../utils/logger";
import {
  RegisterUserDto,
  LoginUserDto,
  UserResponseDto,
  AuthResponseDto,
} from "../../dtos/user";

class UserService {
  private authService: AuthService;
  private dbService: typeof DatabaseService;

  constructor(dbService: typeof DatabaseService, authService: AuthService) {
    this.authService = authService;
    this.dbService = dbService;
  }

  public async createUser(userData: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.findUserByEmail(userData.email);
    if (existingUser) {
      logger.error("User already exists");
      throw new Error("User already exists");
    }

    try {
      const hashedPassword = await this.authService.hashPassword(
        userData.password
      );
      // First query: Insert the user
      const insertQuery = `
            INSERT INTO users (username, email, password) 
            VALUES (?, ?, ?)
        `;
      await this.dbService.query(insertQuery, [
        userData.username,
        userData.email,
        hashedPassword,
      ]);

      // Second query: Get the inserted user
      const selectQuery = `SELECT * FROM users WHERE id = LAST_INSERT_ID()`;
      const userObj = await this.dbService.query(selectQuery);
      if (!userObj) {
        throw new Error("Failed to create user");
      }

      const user: UserResponseDto = {
        id: userObj.id,
        email: userObj.email,
        username: userObj.username,
        createdAt: userObj.created_at,
      };

      return user;
    } catch (error) {
      console.error(`Failed to create user: ${error}`);
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  public async loginUser(userData: LoginUserDto): Promise<AuthResponseDto> {
    const userObj = await this.findUserByEmail(userData.email);
    if (!userObj) {
      throw new Error("User with this email doesn't exist!");
    }
    console.log(userObj);
    const password = await this.authService.comparePasswords(
      userData.password,
      userObj.password
    );
    if (!password) {
      throw new Error("Invalid password, please try again!");
    }

    const token = await this.authService.generateToken(userObj); // check if user is valid here!
    const loggedInUser: AuthResponseDto = {
      user: {
        id: userObj.id,
        username: userObj.username,
        email: userObj.email,
        createdAt: userObj.created_at,
      },
      token: token,
    };
    return loggedInUser;
  }

  public async findUserByEmail(email: string): Promise<any> {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const result = await this.dbService.query(query, [email]);
      return result || null;
    } catch (error) {
      console.error("Database error in findUserByEmail:", error);
      throw new Error("Failed to find user by email");
    }
  }
}

export default UserService;
