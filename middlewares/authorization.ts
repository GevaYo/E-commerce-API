import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/user";

const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;
    console.log((req as any).user);
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({
        message: "You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};

export default authorize;
