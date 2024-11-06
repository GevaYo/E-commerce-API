import { Router } from "express";
import RapydClient from "../services/rapyd/RapydClient";
import PaymentService from "../services/rapyd/PaymentService";
import PaymentController from "../controllers/PaymentController";
import DatabaseService from "../services/db/DatabaseService";

const router = Router();
const rapydClient = new RapydClient();
const paymentService = new PaymentService(DatabaseService, rapydClient);
const paymentController = new PaymentController(paymentService);

router.get("/pay-test", async (req, res) => {
  const response = await paymentService.getCountries();
  res.json({ message: "test", response });
});
export default router;
