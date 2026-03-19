export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  vegetarian: boolean;
  toppings: Topping[];
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedToppings: Topping[];
  customNotes?: string;
}
