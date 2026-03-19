export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
  timestamp: Date;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDetails?: PaymentDetails;
}

export type PaymentMethod = 'credit-card' | 'debit-card' | 'digital-wallet' | 'upi';
