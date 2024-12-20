import { UserRole } from "../models/user";
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  const trimmedUserName = username.trim();
  return trimmedUserName !== "";
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidRole = (role: string): boolean => {
  return role == UserRole.CUSTOMER;
};
