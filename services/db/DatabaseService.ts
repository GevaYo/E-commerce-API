import mysql from "mysql2/promise";

class DatabaseService {
  private pool: mysql.Pool;
  private static instance: DatabaseService;

  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "14235867",
      database: process.env.DB_NAME || "rapyd_integration",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async query(query: string, params?: any[]) {
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
        query,
        params
      );
      return rows[0];
    } catch (error) {
      // Log the actual error and provide more context
      console.error("Database Error:", error);
      throw new Error(`Database query failed: ${error}`);
    }
  }
}

export default DatabaseService.getInstance();
