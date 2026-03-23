export interface DrinkSize {
  size: string;
  price: string;
  format?: string;
}

export interface HotDrinkOption {
  name: string;
  small: string;
  medium: string;
  large: string;
}

export const SOFT_DRINKS: DrinkSize[] = [
  { size: '330ml', format: 'Can', price: 'R12 – R15' },
  { size: '440ml', format: 'Can', price: 'R15 – R18' },
  { size: '500ml', format: 'Bottle', price: 'R15 – R20' },
  { size: '1L', format: 'Bottle', price: 'R20 – R25' },
  { size: '1.5L', format: 'Bottle', price: 'R25 – R30' },
  { size: '2L', format: 'Bottle', price: 'R30 – R35' }
];

export const WATER_SIZES: DrinkSize[] = [
  { size: '330ml', price: 'R8 – R10' },
  { size: '500ml', price: 'R10 – R15' },
  { size: '1L', price: 'R15 – R18' },
  { size: '1.5L', price: 'R18 – R22' }
];

export const SLUSHY_SIZES: DrinkSize[] = [
  { size: 'Small', price: 'R10 – R15' },
  { size: 'Medium', price: 'R15 – R20' },
  { size: 'Large', price: 'R20 – R25' }
];

export const HOT_DRINKS: HotDrinkOption[] = [
  { name: 'Coffee', small: 'R10', medium: 'R12', large: 'R15' },
  { name: 'Hot Chocolate', small: 'R12', medium: 'R15', large: 'R18' },
  { name: 'Milo', small: 'R12', medium: 'R15', large: 'R18' }
];
