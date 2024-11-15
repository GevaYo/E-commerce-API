import { Request, Response, NextFunction } from "express";

export const validateRequestStructure = (requiredFields: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.body || typeof req.body !== "object") {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    next();
  };
};
