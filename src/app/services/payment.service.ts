import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentRequest, PaymentResponse } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  /**
   * Process payment for an order
   * In production, this would integrate with actual payment gateway APIs
   * such as Stripe, Razorpay, PayPal, etc.
   */
  processPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    // Simulate payment processing
    return of({
      success: true,
      transactionId: this.generateTransactionId(),
      message: 'Payment processed successfully',
      timestamp: new Date()
    });
  }

  /**
   * Validate card details format
   */
  validateCardDetails(cardNumber: string, cvv: string): boolean {
    // Basic validation - in production use proper payment gateway validation
    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;
    
    return cardRegex.test(cardNumber.replace(/\s/g, '')) && 
           cvvRegex.test(cvv);
  }

  /**
   * Validate UPI ID format
   */
  validateUPI(upiId: string): boolean {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(upiId);
  }

  /**
   * Get available payment methods
   */
  getPaymentMethods(): string[] {
    return ['credit-card', 'debit-card', 'digital-wallet', 'upi'];
  }

  /**
   * Get payment method display name
   */
  getPaymentMethodName(method: string): string {
    const methodNames: { [key: string]: string } = {
      'credit-card': 'Credit Card',
      'debit-card': 'Debit Card',
      'digital-wallet': 'Digital Wallet',
      'upi': 'UPI'
    };
    return methodNames[method] || method;
  }

  private generateTransactionId(): string {
    return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
