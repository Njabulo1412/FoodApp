import { Component } from '@angular/core';
import { EXTRAS_ITEMS } from '../../data/extras-data';
import { MenuCard } from '../../data/menu-categories';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/menu.model';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-extras-page',
  templateUrl: './extras-page.component.html',
  styleUrls: ['./extras-page.component.css']
})
export class ExtrasPageComponent {
  extras = EXTRAS_ITEMS;
  constructor(private cartService: CartService) {}

  addToCart(extra: MenuCard): void {
    const menuItem = menuCardToMenuItem(extra, 'Extras');
    const cartItem: CartItem = {
      menuItem,
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
