import { Component } from '@angular/core';
import { EXTRAS_ITEMS } from '../../data/extras-data';
import { SOFT_DRINKS, WATER_SIZES, SLUSHY_SIZES, HOT_DRINKS } from '../../data/drinks-data';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/menu.model';
import { MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-customization-page',
  templateUrl: './customization-page.component.html',
  styleUrls: ['./customization-page.component.css']
})
export class CustomizationPageComponent {
  extras = EXTRAS_ITEMS;
  softDrinks = SOFT_DRINKS;
  waterSizes = WATER_SIZES;
  slushySizes = SLUSHY_SIZES;
  hotDrinks = HOT_DRINKS;
  constructor(private cartService: CartService) {}

  addCustomizationPack(): void {
    const card: MenuCard = {
      name: 'Customization Pack',
      price: '5,00',
      description: 'Build your own toppings, sauces, and drinks stack.',
      image: 'assets/roll.jpeg'
    };
    const menuItem = menuCardToMenuItem(card, 'Customization');
    const cartItem: CartItem = {
      menuItem,
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
