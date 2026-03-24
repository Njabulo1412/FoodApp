export interface DrinkSize {
  size: string;
  price: number;
  format?: string;
  image?: string;
}

export interface HotDrinkOption {
  name: string;
  small: number;
  medium: number;
  large: number;
  image?: string;
}

export const SOFT_DRINKS: DrinkSize[] = [
  { size: '330ml', format: 'Can', price: 12, image: 'assets/coca-cola-cold-drink-717.jpg' },
  { size: '440ml', format: 'Can', price: 14, image: 'assets/cold drinks.jpeg' },
  { size: '500ml', format: 'Bottle', price: 16, image: 'assets/cold drinks.jpeg' },
  { size: '1L', format: 'Bottle', price: 18, image: 'assets/coca-cola-cold-drink-717.jpg' },
  { size: '1.5L', format: 'Bottle', price: 20, image: 'assets/cold drinks.jpeg' },
  { size: '2L', format: 'Bottle', price: 22, image: 'assets/coca-cola-cold-drink-717.jpg' }
];

export const WATER_SIZES: DrinkSize[] = [
  { size: '330ml', price: 8, image: 'assets/still water.jpeg' },
  { size: '500ml', price: 10, image: 'assets/spackling water.jpeg' },
  { size: '1L', price: 12, image: 'assets/still water.jpeg' },
  { size: '1.5L', price: 14, image: 'assets/spackling water.jpeg' }
];

export const SLUSHY_SIZES: DrinkSize[] = [
  { size: 'Small', price: 12, image: 'assets/drink 1.jpeg' },
  { size: 'Medium', price: 15, image: 'assets/cold drinks.jpeg' },
  { size: 'Large', price: 18, image: 'assets/drink 1.jpeg' }
];

export const HOT_DRINKS: HotDrinkOption[] = [
  { name: 'Coffee', small: 11, medium: 13, large: 16, image: 'assets/coffee.jpeg' },
  { name: 'Hot Chocolate', small: 13, medium: 16, large: 19, image: 'assets/drink 1.jpeg' },
  { name: 'Milo', small: 12, medium: 15, large: 18, image: 'assets/coffee.jpeg' }
];
