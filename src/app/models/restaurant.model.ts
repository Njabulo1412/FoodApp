export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  rating: number;
  openingHours: string;
  cuisine: string[];
  deliveryTime: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}
