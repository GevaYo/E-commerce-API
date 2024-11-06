import { Request, Response } from "express";
import CheckoutService from "../services/rapyd/CheckoutService";
import { CheckoutPage } from "../types/checkout";

class CheckoutController {
  private checkoutService: CheckoutService;

  constructor(paymentService: CheckoutService) {
    this.checkoutService = paymentService;
  }

  public createCheckoutPage = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { amount, currency, country, complete_checkout_url } = req.body;
      const checkoutPageData: CheckoutPage = {
        amount,
        currency,
        country,
        complete_checkout_url:
          complete_checkout_url || "https://www.google.com",
      };
      const checkoutResult = await this.checkoutService.createCheckoutPage(
        checkoutPageData
      );
      res.status(200).json(checkoutResult);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}

export default CheckoutController;
