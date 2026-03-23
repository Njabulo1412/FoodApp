import { Component } from '@angular/core';
import { SOFT_DRINKS, WATER_SIZES, SLUSHY_SIZES, HOT_DRINKS } from '../../data/drinks-data';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/menu.model';
import { MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css']
})
export class DrinksPageComponent {
  softDrinks = SOFT_DRINKS;
  waterSizes = WATER_SIZES;
  slushySizes = SLUSHY_SIZES;
  hotDrinks = HOT_DRINKS;
  constructor(private cartService: CartService) {}

  addToCart(card: MenuCard): void {
    const menuItem = menuCardToMenuItem(card, 'Drinks');
    const cartItem: CartItem = {
      menuItem,
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }

  addDrinkCombo(type: 'soft' | 'water' | 'slushy' | 'hot'): void {
    const templates: Record<string, MenuCard> = {
      soft: {
        name: 'Soft Drink Combo',
        price: '15,00',
        description: 'A fizzy can to match your roll.',
        image: 'assets/coca-cola-cold-drink-717.jpg'
      },
      water: {
        name: 'Water Bottle',
        price: '10,00',
        description: 'Pure bottled water.',
        image: 'assets/coca-cola-cold-drink-717.jpg'
      },
      slushy: {
        name: 'Slushy (Medium)',
        price: '15,00',
        description: 'Chilled slushy pick.',
        image: 'assets/wings.jpg'
      },
      hot: {
        name: 'Hot Coffee',
        price: '12,00',
        description: 'Steaming coffee.',
        image: 'assets/chips.jpeg'
      }
    };
    this.addToCart(templates[type]);
  }
}
