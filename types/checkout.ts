export interface CheckoutPage {
  amount: number;
  currency: string;
  country: string;
  complete_checkout_url?: string;
}

export interface CheckoutResult {
  id: string;
  redirect_url: string;
}
