import { Component } from '@angular/core';
import { CartItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { ZULU_BURGERS, MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-zulu-burgers',
  templateUrl: './zulu-burgers.component.html',
  styleUrls: ['./zulu-burgers.component.css']
})
export class ZuluBurgersComponent {
  combos = ZULU_BURGERS;
  constructor(private cartService: CartService) {}

  addToCart(combo: MenuCard): void {
    const cartItem: CartItem = {
      menuItem: menuCardToMenuItem(combo, 'Zulu Burgers'),
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
