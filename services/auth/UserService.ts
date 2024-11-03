import DatabaseService from "../db/DatabaseService";
import AuthService from "./AuthService";

class UserService {
  private authService: AuthService;
  private dbService: typeof DatabaseService;

  constructor(dbService: typeof DatabaseService) {
    this.authService = new AuthService();
    this.dbService = dbService;
  }

  public async createUser(userData: any): Promise<any> {
    const existingUser = await this.findUserByEmail(userData.email);
    if (existingUser) {
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
      const newUser = await this.dbService.query(selectQuery);
      if (!newUser) {
        throw new Error("Failed to create user");
      }
      return newUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
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
