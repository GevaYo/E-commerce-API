// Request DTOs
export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
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
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}
