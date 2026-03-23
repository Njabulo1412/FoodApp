import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem, Topping, CartItem } from '../../models/menu.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GWINYA_COMBOS, KOTAS, ROLLS_MENU, WINGS_MENU, ZULU_BURGERS } from '../../data/menu-categories';

@Component({
  selector: 'app-menu-and-customization',
  templateUrl: './menu-and-customization.component.html',
  styleUrls: ['./menu-and-customization.component.css']
})
export class MenuAndCustomizationComponent implements OnInit {
  menuItems: MenuItem[] = [];
  categories: string[] = [];
  gwinyaCombos = GWINYA_COMBOS;
  dailySpecials = [
    {
      name: 'Beef Curry',
      price: '81,00',
      rating: '80% (5)',
      description: 'Tender beef slow cooked in a rich and flavourful curry sauce. Served with your choice of rice or traditional phuthu.'
    },
    {
      name: 'Chicken Curry',
      price: '81,00',
      rating: '',
      description: 'Tender chicken cooked in a fragrant and spiced curry sauce. Served with your choice of rice or traditional phuthu.'
    }
  ];
  zuluBurgers = ZULU_BURGERS;
  kotas = KOTAS;
  rollItems = ROLLS_MENU;
  extras = [
    {
      name: 'Polony',
      price: '3,00',
      rating: '80% (5)',
      description: 'Sliced polony, a bologna-style sausage.'
    },
    {
      name: 'Cheese',
      price: '4,00',
      rating: '100% (7)',
      description: 'Add cheese as a topping or filling.'
    },
    {
      name: 'Vienna',
      price: '4,00',
      rating: '100% (4)',
      description: 'Frankfurter-style Vienna sausage.'
    },
    {
      name: 'Chilli Russian',
      price: '22,00',
      rating: '75% (4)',
      description: 'Spicy'
    },
    {
      name: 'Cheese Russian',
      price: '29,00',
      rating: '75% (4)',
      description: ''
    }
  ];
  softDrinks = [
    { size: '330ml', format: 'Can', price: 'R12 – R15' },
    { size: '440ml', format: 'Can', price: 'R15 – R18' },
    { size: '500ml', format: 'Bottle', price: 'R15 – R20' },
    { size: '1L', format: 'Bottle', price: 'R20 – R25' },
    { size: '1.5L', format: 'Bottle', price: 'R25 – R30' },
    { size: '2L', format: 'Bottle', price: 'R30 – R35' }
  ];
  crmBoard = {
    title: 'CRM Board (Live)',
    displays: ['User', 'Total price', 'Delivery type'],
    description: 'Updates instantly when new orders arrive so staff always see what is in flight.'
  };
  waterSizes = [
    { size: '330ml', price: 'R8 – R10' },
    { size: '500ml', price: 'R10 – R15' },
    { size: '1L', price: 'R15 – R18' },
    { size: '1.5L', price: 'R18 – R22' }
  ];
  slushySizes = [
    { size: 'Small', price: 'R10 – R15' },
    { size: 'Medium', price: 'R15 – R20' },
    { size: 'Large', price: 'R20 – R25' }
  ];
  hotDrinks = [
    { name: 'Coffee', small: 'R10', medium: 'R12', large: 'R15' },
    { name: 'Hot Chocolate', small: 'R12', medium: 'R15', large: 'R18' },
    { name: 'Milo', small: 'R12', medium: 'R15', large: 'R18' }
  ];
  selectedCategory: string = '';
  cart: CartItem[] = [];
  selectedItem: MenuItem | null = null;
  showCustomizationModal = false;
  selectedToppings: Topping[] = [];
  quantity = 1;
  customNotes = '';
  isAuthenticated = false;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Allow all users to view the menu. Track auth state to enable/disable actions like checkout.
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.loadMenu();
    this.loadCategories();
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  loadMenu(): void {
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        if (this.selectedCategory) {
          this.filterByCategory(this.selectedCategory);
        }
      }
    });
  }

  loadCategories(): void {
    this.menuService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        if (categories.length > 0) {
          this.selectedCategory = categories[0];
          this.filterByCategory(this.selectedCategory);
        }
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.menuService.getMenuItemsByCategory(category).subscribe({
      next: (items) => {
        this.menuItems = items;
      }
    });
  }

  openCustomizationModal(item: MenuItem): void {
    this.selectedItem = item;
    this.selectedToppings = [];
    this.quantity = 1;
    this.customNotes = '';
    this.showCustomizationModal = true;
  }

  closeCustomizationModal(): void {
    this.showCustomizationModal = false;
    this.selectedItem = null;
    this.selectedToppings = [];
  }

  toggleTopping(topping: Topping): void {
    const index = this.selectedToppings.findIndex(t => t.id === topping.id);
    if (index > -1) {
      this.selectedToppings.splice(index, 1);
    } else {
      this.selectedToppings.push(topping);
    }
  }

  isToppingSelected(topping: Topping): boolean {
    return this.selectedToppings.some(t => t.id === topping.id);
  }

  getToppingPrice(): number {
    return this.selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
  }

  getItemTotalPrice(): number {
    if (!this.selectedItem) return 0;
    const basePrice = this.selectedItem.price;
    const toppingPrice = this.getToppingPrice();
    return (basePrice + toppingPrice) * this.quantity;
  }

  addToCart(): void {
    if (!this.selectedItem) return;

    const cartItem: CartItem = {
      menuItem: this.selectedItem,
      quantity: this.quantity,
      selectedToppings: [...this.selectedToppings],
      customNotes: this.customNotes
    };

    this.cartService.addToCart(cartItem);
    this.closeCustomizationModal();
    alert('Item added to cart!');
  }

  removeFromCart(index: number): void {
    this.cartService.removeItem(index);
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => {
      const itemPrice = item.menuItem.price;
      const toppingPrice = item.selectedToppings.reduce((t, top) => t + top.price, 0);
      return sum + (itemPrice + toppingPrice) * item.quantity;
    }, 0);
  }

  scrollToMenu(): void {
    const section = document.getElementById('menu-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  proceedToCheckout(): void {
    if (this.cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }
    // Require authentication before proceeding to orders/checkout
    if (!this.authService.isAuthenticated()) {
      // redirect to login and include returnUrl so user can come back to checkout
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/orders' } });
      return;
    }

    this.router.navigate(['/orders']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity > 0) {
      this.quantity = newQuantity;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  getToppingNames(toppings: Topping[]): string {
    return toppings.map(t => t.name).join(', ');
  }
}
