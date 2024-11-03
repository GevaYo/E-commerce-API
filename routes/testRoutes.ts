import { Router } from "express";
import authentication from "../middlewares/authentication";
import { Request, Response } from "express";

const router = Router();

router.get("/protected", authentication, (req: Request, res: Response) => {
  res.json({ message: "Access granted", user: (req as any).user });
});

export default router;
