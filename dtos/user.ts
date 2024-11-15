import { User, UserRole } from "models/user";

// Request DTOs
export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

// Response DTOs
export interface UserResponseDto {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}
