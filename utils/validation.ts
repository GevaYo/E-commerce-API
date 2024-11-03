import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const validateUserRegistration = (): RequestHandler[] => [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Ensure the function returns after sending the response
    }
    next();
  },
];
