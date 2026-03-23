import { Component } from '@angular/core';
import { CartItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { ROLLS_MENU, MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.css']
})
export class RollsComponent {
  rolls = ROLLS_MENU;
  constructor(private cartService: CartService) {}

  addToCart(roll: MenuCard): void {
    const cartItem: CartItem = {
      menuItem: menuCardToMenuItem(roll, 'Rolls'),
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
