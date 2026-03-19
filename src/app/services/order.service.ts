import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders$ = new BehaviorSubject<Order[]>([]);
  private currentOrder$ = new BehaviorSubject<Order | null>(null);

  constructor() { }

  createOrder(order: Order): Observable<Order> {
    order.id = this.generateOrderId();
    order.status = 'pending';
    order.createdAt = new Date();

    const orders = this.orders$.value;
    orders.push(order);
    this.orders$.next(orders);
    this.currentOrder$.next(order);

    return of(order);
  }

  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  getOrderById(id: string): Observable<Order | undefined> {
    const orders = this.orders$.value;
    return of(orders.find(order => order.id === id));
  }

  getUserOrders(userId: string): Observable<Order[]> {
    const orders = this.orders$.value;
    return of(orders.filter(order => order.userId === userId));
  }

  updateOrderStatus(orderId: string, status: any): Observable<boolean> {
    const orders = this.orders$.value;
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      this.orders$.next(orders);
      return of(true);
    }
    
    return of(false);
  }

  cancelOrder(orderId: string): Observable<boolean> {
    return this.updateOrderStatus(orderId, 'cancelled');
  }

  getCurrentOrder(): Order | null {
    return this.currentOrder$.value;
  }

  clearCurrentOrder(): void {
    this.currentOrder$.next(null);
  }

  private generateOrderId(): string {
    return 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
