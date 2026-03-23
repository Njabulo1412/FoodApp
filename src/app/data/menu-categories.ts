export interface MenuCard {
  name: string;
  price: string;
  rating?: string;
  description: string;
  image?: string;
}

export const DAILY_SPECIALS: MenuCard[] = [
  {
    name: 'Beef Curry',
    price: '81,00',
    rating: '80% (5)',
    description: 'Tender beef slow cooked in a rich and flavourful curry sauce.',
    image: 'assets/beef.webp'
  },
  {
    name: 'Chicken Curry',
    price: '81,00',
    description: 'Tender chicken cooked in a fragrant and spiced curry sauce.',
    image: 'assets/chicken.jpg'
  }
];

export const GWINYA_COMBOS: MenuCard[] = [
  {
    name: 'Gwinya Vetkoek Combo',
    price: '7,00',
    rating: '93% (30)',
    description: 'Crispy on the outside and fluffy on the inside.',
    image: 'assets/Magwinya%2BRecipe.webp'
  },
  {
    name: 'Gwinya and Polony Combo',
    price: '10,00',
    rating: '100% (4)',
    description: 'Vetkoek filled with polony and just the right amount of sauce.',
    image: 'assets/Magwinya%2BRecipe.webp'
  },
  {
    name: 'Gwinya and Cheese Combo',
    price: '12,00',
    description: 'Vetkoek filled with a generous slice of Cheddar cheese.',
    image: 'assets/Magwinya%2BRecipe.webp'
  },
  {
    name: 'Gwinya, Polony and Cheese Combo',
    price: '15,00',
    rating: '100% (3)',
    description: 'Deep fried vetkoek packed with polony and gooey cheese.',
    image: 'assets/Magwinya%2BRecipe.webp'
  },
  {
    name: 'Gwinya and Fried Chips (small) Combo',
    price: '34,00',
    rating: '85% (7)',
    description: 'Vetkoek served next to crispy fried chips and sauce.',
    image: 'assets/Magwinya%2BRecipe.webp'
  }
];

export const ZULU_BURGERS: MenuCard[] = [
  {
    name: 'Zulu Burger Combo',
    price: '22,00',
    description: 'Gwinya packed with fried chips.',
    image: 'assets/zulu%20burger.jpeg'
  },
  {
    name: 'Zulu Burger with Polony Combo',
    price: '25,00',
    description: 'Fried chips layered with polony inside the gwinya.',
    image: 'assets/zulu%20burger.jpeg'
  },
  {
    name: 'Zulu Burger with Cheese and Polony Combo',
    price: '30,00',
    rating: '60% (5)',
    description: 'Cheese, polony, and fried chips for maximum flavour.',
    image: 'assets/zulu%20burger.jpeg'
  }
];

export const KOTAS: MenuCard[] = [
  {
    name: 'Kota 1',
    price: '37,00',
    description: 'Quarter loaf with chips, atchar, egg and polony.',
    image: 'assets/kota.jpeg'
  },
  {
    name: 'Kota 2',
    price: '37,00',
    description: 'Quarter loaf with chips, atchar, cheese and polony.',
    image: 'assets/kota.jpeg'
  },
  {
    name: 'Kota 3',
    price: '44,00',
    description: 'Quarter loaf with chips, atchar, cheese, polony and egg.',
    image: 'assets/kota.jpeg'
  },
  {
    name: 'Kota 4',
    price: '59,00',
    rating: '100% (3)',
    description: 'Quarter loaf with chips, atchar, Russian, cheese, polony and egg.',
    image: 'assets/kota.jpeg'
  },
  {
    name: 'Kota 5',
    price: '59,00',
    description: 'Quarter loaf with chips, atchar, crispy bacon, egg and cheese. Popular',
    image: 'assets/kota.jpeg'
  },
  {
    name: 'Last Number Kota',
    price: '81,00',
    description: 'Loaded loaf with chips, atchar, cheese, polony, chopped Russian, burger patty, egg and sauce.',
    image: 'assets/kota.jpeg'
  }
];

export const WINGS_MENU: MenuCard[] = [
  {
    name: 'Wings & Chips',
    price: '68,00',
    rating: '95% (14)',
    description: 'Double-fired wings in chilli glaze with cut fries.',
    image: 'assets/wings.jpg'
  },
  {
    name: 'Honey Glazed Wings',
    price: '72,00',
    description: 'Sweet and spicy glaze over crispy wings.',
    image: 'assets/wings.jpg'
  },
  {
    name: 'Peri-Peri Wings',
    price: '70,00',
    description: 'Charred wings tossed in peri-peri and served with slaw.',
    image: 'assets/wings.jpg'
  }
];

export const ROLLS_MENU: MenuCard[] = [
  {
    name: 'Cheese Russian Roll',
    price: '44,00',
    description: 'Cheese Russian, grilled onions and sauce in a roll.',
    image: 'assets/rush.jpeg'
  },
  {
    name: 'Chilli Russian Roll',
    price: '29,00',
    description: 'Chilli Russian iyababa, grilled onions and sauce in a roll. Spicy',
    image: 'assets/rush.jpeg'
  },
  {
    name: 'Chip Roll',
    price: '22,00',
    description: 'Chips and sauce rolled to-go.',
    image: 'assets/roll.jpeg'
  }
];
