import { Request, Response } from "express";
import PaymentService from "../services/rapyd/PaymentService";

class PaymentController {
  private paymentService: PaymentService;

  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }
}

export default PaymentController;
