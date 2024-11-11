import { User } from "../../models/user";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IDbService } from "../../services/db/IDbService";
import logger from "../../utils/logger";

export class MySqlUserRepository implements IUserRepository {
  private dbService: IDbService;
  constructor(dbService: IDbService) {
    this.dbService = dbService;
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.dbService.executeQuery<User>(
        "SELECT * FROM users WHERE id=?",
        [id]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.dbService.executeQuery<User>(
        "SELECT * FROM users WHERE email=?",
        [email]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.dbService.executeQueryMany<User>(
        "SELECT * FROM users"
      );
      return users;
    } catch (error) {
      throw error;
    }
  }

  async create(
    user: Omit<User, "id" | "created_at" | "updated_at">
  ): Promise<User> {
    try {
      const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
      const param = [user.username, user.email, user.password];
      await this.dbService.executeQuery(insertQuery, param);

      const userQuery = `SELECT * FROM users WHERE id = LAST_INSERT_ID()`;
      const createdUser = await this.dbService.executeQuery<User>(userQuery);
      return createdUser;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  //async update(id: number, user: Partial<User>): Promise<User> {}
  //async delete(id: number): Promise<boolean> {}
}
