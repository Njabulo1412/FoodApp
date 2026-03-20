import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Topping } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'lollysCart';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  get cart$(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(cartItem: CartItem): void {
    const cart = [...this.cartSubject.value];
    const existingIndex = cart.findIndex(item =>
      item.menuItem.id === cartItem.menuItem.id &&
      this.areToppingsEqual(item.selectedToppings, cartItem.selectedToppings)
    );

    if (existingIndex > -1) {
      const existing = cart[existingIndex];
      existing.quantity += cartItem.quantity;
      existing.selectedToppings = [...cartItem.selectedToppings];
      existing.customNotes = cartItem.customNotes;
    } else {
      cart.push({ ...cartItem, selectedToppings: [...cartItem.selectedToppings] });
    }

    this.saveCart(cart);
  }

  removeItem(index: number): void {
    const cart = [...this.cartSubject.value];
    if (index < 0 || index >= cart.length) {
      return;
    }
    cart.splice(index, 1);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  private saveCart(cart: CartItem[]): void {
    this.cartSubject.next(cart);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  private loadCart(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [];
    }

    try {
      const parsed: CartItem[] = JSON.parse(stored);
      return parsed;
    } catch (error) {
      console.warn('Failed to parse stored cart, resetting', error);
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private areToppingsEqual(a: Topping[], b: Topping[]): boolean {
    if (a.length !== b.length) {
      return false;
    }

    const sortedA = a.map(t => t.id).sort().join(',');
    const sortedB = b.map(t => t.id).sort().join(',');
    return sortedA === sortedB;
  }
}
