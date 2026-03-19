export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  deliveryType: 'home-delivery' | 'click-collect';
  deliveryAddress?: Address;
  restaurantId?: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  estimatedDeliveryTime?: number;
}

export interface OrderItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  selectedToppings: Topping[];
  customNotes?: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export type PaymentMethod = 'credit-card' | 'debit-card' | 'digital-wallet' | 'upi';

export interface Address {
  id?: string;
  street: string;
  city: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  label?: string;
}
