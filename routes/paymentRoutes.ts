import { Router } from "express";
import RapydClient from "../services/rapyd/RapydClient";
import PaymentService from "../services/rapyd/PaymentService";
import PaymentController from "../controllers/PaymentController";
import DatabaseService from "../services/db/DatabaseService";
import CheckoutService from "../services/rapyd/CheckoutService";
import CheckoutController from "../controllers/CheckoutController";

const router = Router();

const rapydClient = new RapydClient();
const paymentService = new PaymentService(DatabaseService, rapydClient);
const checkoutService = new CheckoutService(DatabaseService, rapydClient);

const paymentController = new PaymentController(paymentService);
const checkoutController = new CheckoutController(checkoutService);

router.get("/pay-test", async (req, res) => {
  const response = await paymentService.getCountries();
  res.json({ message: "test", response });
});

router.post("/checkout", checkoutController.createCheckoutPage);

export default router;
