import { Router } from "express";
import RapydClient from "../services/rapyd/RapydClient";
import PaymentService from "../services/rapyd/PaymentService";
import PaymentController from "../controllers/PaymentController";
import DatabaseService from "../services/db/DatabaseService";


const router = Router();
const rapydClient = new RapydClient();
const paymentService = new PaymentService(rapydClient, DatabaseService);
const paymentController = new PaymentController(paymentService);

router.get('/pay-test', (req, res) => {
    res.json({message: 'test'});
})
export default router;
