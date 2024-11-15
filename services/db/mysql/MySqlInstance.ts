import mysql from "mysql2/promise";

class MySqlInstance {
  private pool: mysql.Pool;
  private static instance: MySqlInstance;

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

  public static getInstance(): MySqlInstance {
    if (!MySqlInstance.instance) {
      MySqlInstance.instance = new MySqlInstance();
    }
    return MySqlInstance.instance;
  }

  public getPool(): mysql.Pool {
    return this.pool;
  }
}
export default MySqlInstance.getInstance();
