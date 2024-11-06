import { RapydClient } from "../rapyd/RapydClient";
import { RapydBaseService } from "./BaseService";
import DatabaseService from "../db/DatabaseService";
import { CheckoutPage, CheckoutResult } from "../../types/checkout";

export default class CheckoutService extends RapydBaseService {
  constructor(db: typeof DatabaseService, rapydClient: RapydClient) {
    super(db, rapydClient);
  }

  public createCheckoutPage = async (
    checkoutPageData: CheckoutPage
  ): Promise<CheckoutResult> => {
    try {
      console.log(checkoutPageData);
      const response = await this.rapydClient.makeRequest(
        "post",
        "/v1/checkout",
        checkoutPageData
      );
      console.log(response);
      return { id: response.data.id, redirect_url: response.data.redirect_url };
    } catch (error) {
      throw new Error(`Failed to create a checkout page: ${error}`);
    }
  };
}
