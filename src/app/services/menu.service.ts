import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MenuItem, Topping } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems$ = new BehaviorSubject<MenuItem[]>([]);

  constructor() {
    this.initializeMenu();
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems$.asObservable();
  }

  getMenuItemById(id: string): Observable<MenuItem | undefined> {
    const items = this.menuItems$.value;
    return of(items.find(item => item.id === id));
  }

  getMenuItemsByCategory(category: string): Observable<MenuItem[]> {
    const items = this.menuItems$.value;
    return of(items.filter(item => item.category === category));
  }

  getCategories(): Observable<string[]> {
    const items = this.menuItems$.value;
    const categories = [...new Set(items.map(item => item.category))];
    return of(categories);
  }

  private initializeMenu(): void {
    const toppings: { [key: string]: Topping[] } = {
      chips: [
        { id: '1', name: 'Salt', price: 5 },
        { id: '2', name: 'Vinegar', price: 5 },
        { id: '3', name: 'Spicy Seasoning', price: 10 }
      ]
    };

    const menu: MenuItem[] = [
      {
        id: '1',
        name: 'Small Chips',
        description: 'Crispy fried potato chips - small portion',
        price: 14,
        category: 'Chips',
        image: 'assets/chips.jpeg',
        vegetarian: true,
        toppings: toppings['chips']
      },
      {
        id: '2',
        name: 'Medium Chips',
        description: 'Crispy fried potato chips - medium portion',
        price: 25,
        category: 'Chips',
        image: 'assets/chips.jpeg',
        vegetarian: true,
        toppings: toppings['chips']
      },
      {
        id: '3',
        name: 'Large Chips',
        description: 'Crispy fried potato chips - large portion',
        price: 30,
        category: 'Chips',
        image: 'assets/chips.jpeg',
        vegetarian: true,
        toppings: toppings['chips']
      }
      ,
      {
        id: '4',
        name: 'Coca-Cola (330ml)',
        description: 'Chilled Coca-Cola soft drink',
        price: 15,
        category: 'Drinks',
        image: 'assets/coca-cola-cold-drink-717.jpg',
        vegetarian: true,
        toppings: []
      },
      {
        id: '5',
        name: 'Magwinya',
        description: 'Traditional deep-fried dough (Magwinya)',
        price: 20,
        category: 'Snacks',
        image: 'assets/Magwinya+Recipe.webp',
        vegetarian: true,
        toppings: []
      }
    ];

    this.menuItems$.next(menu);
  }
}
