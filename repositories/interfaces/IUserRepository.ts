import { User } from "../../models/user";

export interface IUserRepository {
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User>;
  //update(id: number, user: Partial<User>): Promise<User>;
  //delete(id: number): Promise<boolean>;
}
