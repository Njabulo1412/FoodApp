import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/menu.model';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.css']
})
export class CartWidgetComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  isOpen = false;
  private cartSub: Subscription | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => {
      const toppingsTotal = this.getToppingTotal(item);
      return sum + (item.menuItem.price + toppingsTotal) * item.quantity;
    }, 0);
  }

  viewCartPage(): void {
    this.router.navigate(['/orders']);
    this.close();
  }

  getToppingTotal(item: CartItem): number {
    return item.selectedToppings.reduce((total, topping) => total + topping.price, 0);
  }
}
