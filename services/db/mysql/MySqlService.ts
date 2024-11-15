import MySqlInstance from "./MySqlInstance";
import { IDbService } from "../IDbService";
import { RowDataPacket } from "mysql2/promise";
import logger from "../../../utils/logger";

export class MySqlService implements IDbService {
  private pool = MySqlInstance.getPool();

  public async executeQuery<T>(query: string, params?: any): Promise<T> {
    try {
      const [rows] = await this.pool.query<(T & RowDataPacket)[]>(
        query,
        params
      );
      return rows[0] as T;
    } catch (error) {
      logger.error(`Failed to execute the query`);
      throw error;
    }
  }

  public async executeQueryMany<T>(query: string, params?: any): Promise<T[]> {
    try {
      const [rows] = await this.pool.query<(T & RowDataPacket)[]>(
        query,
        params
      );
      return rows as T[];
    } catch (error) {
      logger.error(`Failed to execute the query`);
      throw error;
    }
  }
}
