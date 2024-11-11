//import DatabaseService from "../db/DatabaseService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import AuthService from "./AuthService";
import logger from "../../utils/logger";
import { User } from "../../models/user";
import {
  RegisterUserDto,
  LoginUserDto,
  UserResponseDto,
  AuthResponseDto,
} from "../../dtos/user";

class UserService {
  private authService: AuthService;
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository, authService: AuthService) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  public async createUser(userData: RegisterUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      logger.error(`User with email ${userData.email} already exists`);
      throw new Error("User with this email already exists");
    }
    try {
      const hashedPassword = await this.authService.hashPassword(
        userData.password
      );
      const newUser = await this.userRepository.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });
      /*  Consider creating a mapper between a User to a UserResponseDto  */
      const userResponse: UserResponseDto = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      return userResponse;
    } catch (error) {
      logger.error("Failed to create user", { error });
      throw new Error("Failed to create user. Please try again later.");
    }
  }

  public async loginUser(userData: LoginUserDto): Promise<AuthResponseDto> {
    const userObj = await this.userRepository.findByEmail(userData.email);
    if (!userObj) {
      throw new Error("User with this email doesn't exist!");
    }
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
      },
      token: token,
    };
    return loggedInUser;
  }
}

export default UserService;
