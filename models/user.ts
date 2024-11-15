export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
