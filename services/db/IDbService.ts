export interface IDbService {
  executeQuery<T>(query: string, params?: any): Promise<T>;
  executeQueryMany<T>(query: string, params?: any): Promise<T[]>;
}
