import { Component } from '@angular/core';
import { CartItem } from '../../models/menu.model';
import { CartService } from '../../services/cart.service';
import { menuCardToMenuItem } from '../../utils/menu-card-utils';
import { KOTAS, MenuCard } from '../../data/menu-categories';

@Component({
  selector: 'app-kota-menu',
  templateUrl: './kota-menu.component.html',
  styleUrls: ['./kota-menu.component.css']
})
export class KotaMenuComponent {
  kotas = KOTAS;
  selectedKota: string | null = null;
  constructor(private cartService: CartService) {}

  selectKota(name: string): void {
    this.selectedKota = name;
  }

  addToCart(kota: MenuCard): void {
    const cartItem: CartItem = {
      menuItem: menuCardToMenuItem(kota, 'Kota Menu'),
      quantity: 1,
      selectedToppings: []
    };
    this.cartService.addToCart(cartItem);
  }
}
