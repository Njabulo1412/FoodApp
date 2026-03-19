import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem, Topping, CartItem } from '../../models/menu.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-and-customization',
  templateUrl: './menu-and-customization.component.html',
  styleUrls: ['./menu-and-customization.component.css']
})
export class MenuAndCustomizationComponent implements OnInit {
  menuItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  cart: CartItem[] = [];
  selectedItem: MenuItem | null = null;
  showCustomizationModal = false;
  selectedToppings: Topping[] = [];
  quantity = 1;
  customNotes = '';

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadMenu();
    this.loadCategories();
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

    const existingItem = this.cart.findIndex(
      item => item.menuItem.id === this.selectedItem!.id
    );

    if (existingItem > -1) {
      this.cart[existingItem].quantity += this.quantity;
      this.cart[existingItem].selectedToppings = [...this.selectedToppings];
    } else {
      this.cart.push(cartItem);
    }

    this.closeCustomizationModal();
    alert('Item added to cart!');
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, item) => {
      const itemPrice = item.menuItem.price;
      const toppingPrice = item.selectedToppings.reduce((t, top) => t + top.price, 0);
      return sum + (itemPrice + toppingPrice) * item.quantity;
    }, 0);
  }

  proceedToCheckout(): void {
    if (this.cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }
    this.router.navigate(['/orders'], { state: { cart: this.cart } });
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

