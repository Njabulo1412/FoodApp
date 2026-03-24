import { Component } from '@angular/core';
import { DrinkSize, HotDrinkOption, SOFT_DRINKS, WATER_SIZES, SLUSHY_SIZES, HOT_DRINKS } from '../../data/drinks-data';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/menu.model';
import { MenuCard } from '../../data/menu-categories';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';

type HotDrinkSize = 'small' | 'medium' | 'large';

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

  private createDrinkCard(name: string, price: string, description: string): MenuCard {
    return { name, price, description };
  }

  addSoftDrinkToCart(drink: DrinkSize): void {
    const title = `Soft Drink • ${drink.size}${drink.format ? ` (${drink.format})` : ''}`;
    const card = this.createDrinkCard(title, drink.price, `Refreshing ${drink.format?.toLowerCase() ?? 'drink'}`);
    this.addToCart(card);
  }

  addWaterToCart(water: DrinkSize): void {
    const title = `Water • ${water.size}`;
    const card = this.createDrinkCard(title, water.price, 'Pure bottled water');
    this.addToCart(card);
  }

  addSlushyToCart(slushy: DrinkSize): void {
    const title = `Slushy • ${slushy.size}`;
    const card = this.createDrinkCard(title, slushy.price, 'Chilled slushy');
    this.addToCart(card);
  }

  addHotDrinkToCart(drink: HotDrinkOption, size: HotDrinkSize): void {
    const formattedSize = size.charAt(0).toUpperCase() + size.slice(1);
    const title = `${drink.name} • ${formattedSize}`;
    const price = drink[size];
    const card = this.createDrinkCard(title, price, `Hot ${drink.name.toLowerCase()} (${formattedSize})`);
    this.addToCart(card);
  }
}
