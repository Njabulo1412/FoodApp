import { Component } from '@angular/core';
import { CartItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { WINGS_MENU, MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-wings',
  templateUrl: './wings.component.html',
  styleUrls: ['./wings.component.css']
})
export class WingsComponent {
  wings = WINGS_MENU;
  constructor(private cartService: CartService) {}

  addToCart(wing: MenuCard): void {
    const cartItem: CartItem = {
      menuItem: menuCardToMenuItem(wing, 'Wings'),
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
