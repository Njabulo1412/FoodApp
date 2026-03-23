import { Component } from '@angular/core';
import { CartItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { DAILY_SPECIALS, MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-daily-specials',
  templateUrl: './daily-specials.component.html',
  styleUrls: ['./daily-specials.component.css']
})
export class DailySpecialsComponent {
  specials: MenuCard[] = DAILY_SPECIALS;
  constructor(private cartService: CartService) {}

  addToCart(special: MenuCard): void {
    const cartItem: CartItem = {
      menuItem: menuCardToMenuItem(special, 'Daily Specials'),
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
