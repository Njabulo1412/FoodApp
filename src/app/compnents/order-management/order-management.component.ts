import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { LocationService } from '../../services/location.service';
import { PaymentService } from '../../services/payment.service';
import { Order, OrderItem, Address } from '../../models/order.model';
import { CartItem } from '../../models/menu.model';
import { Restaurant } from '../../models/restaurant.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  cart: CartItem[] = [];
  deliveryType: 'home-delivery' | 'click-collect' = 'home-delivery';
  selectedRestaurant: Restaurant | null = null;
  nearbyRestaurants: Restaurant[] = [];
  deliveryAddress: Address = { street: '', city: '', postalCode: '' };
  paymentMethod: string = 'credit-card';
  showPaymentForm = false;
  paymentDetails: any = { cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' };
  upiId: string = '';
  orders: Order[] = [];
  loading = false;
  error: string = '';
  success: string = '';
  currentUser: any = null;
  estimatedDeliveryTime = 30;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private locationService: LocationService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.cart$.pipe(take(1)).subscribe(items => {
      this.cart = items;
      if (this.cart.length === 0) {
        this.router.navigate(['/menu']);
      }
    });

    this.initializeLocationAndRestaurants();
    this.loadOrders();
  }

  initializeLocationAndRestaurants(): void {
    this.locationService.getLocationFromGPS();
    this.locationService.getNearbyRestaurants().subscribe({
      next: (restaurants) => {
        this.nearbyRestaurants = restaurants;
        if (restaurants.length > 0) {
          this.selectedRestaurant = restaurants[0];
        }
      }
    });
  }

  loadOrders(): void {
    this.orderService.getUserOrders(this.currentUser.id).subscribe({
      next: (orders) => {
        this.orders = orders;
      }
    });
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => {
      const itemPrice = item.menuItem.price;
      const toppingPrice = item.selectedToppings.reduce((t, top) => t + top.price, 0);
      return sum + (itemPrice + toppingPrice) * item.quantity;
    }, 0);
  }

  getEstimatedDeliveryTime(): number {
    if (!this.selectedRestaurant) return 30;
    return this.selectedRestaurant.deliveryTime;
  }

  selectDeliveryType(type: 'home-delivery' | 'click-collect'): void {
    this.deliveryType = type;
  }

  selectRestaurant(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    this.estimatedDeliveryTime = restaurant.deliveryTime;
  }

  updateDeliveryAddress(): void {
    if (!this.deliveryAddress.street || !this.deliveryAddress.city || !this.deliveryAddress.postalCode) {
      this.error = 'Please fill in all address fields';
      return;
    }
    this.locationService.setDeliveryAddress(this.deliveryAddress);
    this.success = 'Delivery address updated';
    setTimeout(() => this.success = '', 3000);
  }

  selectPaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.showPaymentForm = true;
  }

  submitOrder(): void {
    if (this.deliveryType === 'home-delivery' && !this.deliveryAddress.street) {
      this.error = 'Please provide delivery address';
      return;
    }

    if (!this.selectedRestaurant) {
      this.error = 'Please select a restaurant';
      return;
    }

    this.loading = true;
    this.error = '';

    // Create order items
    const orderItems: OrderItem[] = this.cart.map(cartItem => ({
      menuItemId: cartItem.menuItem.id,
      menuItemName: cartItem.menuItem.name,
      quantity: cartItem.quantity,
      price: cartItem.menuItem.price,
      selectedToppings: cartItem.selectedToppings,
      customNotes: cartItem.customNotes
    }));

    // Create order
    const order: Order = {
      userId: this.currentUser.id,
      items: orderItems,
      deliveryType: this.deliveryType,
      deliveryAddress: this.deliveryType === 'home-delivery' ? this.deliveryAddress : undefined,
      restaurantId: this.selectedRestaurant.id,
      totalAmount: this.getCartTotal(),
      paymentMethod: this.paymentMethod as any,
      status: 'pending'
    };

    // Process payment
    this.paymentService.processPayment({
      orderId: '',
      amount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      paymentDetails: this.paymentDetails
    }).subscribe({
      next: (response) => {
        if (response.success) {
          // Save order
          this.orderService.createOrder(order).subscribe({
            next: (createdOrder) => {
              this.success = `Order placed successfully! Order ID: ${createdOrder.id}`;
              this.loading = false;
              this.cartService.clearCart();
              this.cart = [];
              this.loadOrders();
            },
            error: (error) => {
              this.error = 'Failed to create order';
              this.loading = false;
            }
          });
        } else {
          this.error = 'Payment failed. Please try again.';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Payment processing failed';
        this.loading = false;
      }
    });
  }

  validateCardDetails(): boolean {
    if (!this.paymentDetails.cardNumber || !this.paymentDetails.cvv) {
      this.error = 'Please fill in all card details';
      return false;
    }
    return this.paymentService.validateCardDetails(this.paymentDetails.cardNumber, this.paymentDetails.cvv);
  }

  validateUPI(): boolean {
    if (!this.upiId) {
      this.error = 'Please enter UPI ID';
      return false;
    }
    return this.paymentService.validateUPI(this.upiId);
  }

  cancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.loadOrders();
          this.success = 'Order cancelled successfully';
        }
      });
    }
  }

  getToppingNames(toppings: any[]): string {
    return toppings.map(t => t.name).join(', ');
  }

  getCartItemPrice(item: CartItem): number {
    const itemPrice = item.menuItem.price;
    const toppingPrice = item.selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return (itemPrice + toppingPrice) * item.quantity;
  }

  getGSTAmount(): string {
    return (this.getCartTotal() * 0.05).toFixed(2);
  }

  getTotalAmount(): string {
    return (this.getCartTotal() * 1.05).toFixed(2);
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }
}
