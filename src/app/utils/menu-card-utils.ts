import { MenuItem } from '../models/menu.model';
import { MenuCard } from '../data/menu-categories';

function parsePrice(value: string | undefined): number {
  if (!value) {
    return 0;
  }
  const normalized = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeId(category: string, name: string): string {
  const sanitize = (text: string) =>
    text.toLowerCase().trim().replace(/[\s\/]+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${sanitize(category)}-${sanitize(name)}`;
}

export function menuCardToMenuItem(card: MenuCard, category: string): MenuItem {
  return {
    id: normalizeId(category, card.name),
    name: card.name,
    description: card.description,
    price: parsePrice(card.price),
    category,
    image: card.image,
    vegetarian: false,
    toppings: []
  };
}
