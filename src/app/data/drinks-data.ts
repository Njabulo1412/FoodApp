export interface DrinkSize {
  size: string;
  price: string;
  format?: string;
  image?: string;
}

export interface HotDrinkOption {
  name: string;
  small: string;
  medium: string;
  large: string;
  image?: string;
}

export const SOFT_DRINKS: DrinkSize[] = [
  { size: '330ml', format: 'Can', price: 'R12 – R15', image: 'assets/coca-cola-cold-drink-717.jpg' },
  { size: '440ml', format: 'Can', price: 'R15 – R18', image: 'assets/cold drinks.jpeg' },
  { size: '500ml', format: 'Bottle', price: 'R15 – R20', image: 'assets/cold drinks.jpeg' },
  { size: '1L', format: 'Bottle', price: 'R20 – R25', image: 'assets/coca-cola-cold-drink-717.jpg' },
  { size: '1.5L', format: 'Bottle', price: 'R25 – R30', image: 'assets/cold drinks.jpeg' },
  { size: '2L', format: 'Bottle', price: 'R30 – R35', image: 'assets/coca-cola-cold-drink-717.jpg' }
];

export const WATER_SIZES: DrinkSize[] = [
  { size: '330ml', price: 'R8 – R10', image: 'assets/still water.jpeg' },
  { size: '500ml', price: 'R10 – R15', image: 'assets/spackling water.jpeg' },
  { size: '1L', price: 'R15 – R18', image: 'assets/still water.jpeg' },
  { size: '1.5L', price: 'R18 – R22', image: 'assets/spackling water.jpeg' }
];

export const SLUSHY_SIZES: DrinkSize[] = [
  { size: 'Small', price: 'R10 – R15', image: 'assets/drink 1.jpeg' },
  { size: 'Medium', price: 'R15 – R20', image: 'assets/cold drinks.jpeg' },
  { size: 'Large', price: 'R20 – R25', image: 'assets/drink 1.jpeg' }
];

export const HOT_DRINKS: HotDrinkOption[] = [
  { name: 'Coffee', small: 'R10', medium: 'R12', large: 'R15', image: 'assets/coffee.jpeg' },
  { name: 'Hot Chocolate', small: 'R12', medium: 'R15', large: 'R18', image: 'assets/drink 1.jpeg' },
  { name: 'Milo', small: 'R12', medium: 'R15', large: 'R18', image: 'assets/coffee.jpeg' }
];
