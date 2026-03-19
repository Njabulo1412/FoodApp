import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Restaurant, Location } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private currentLocation$ = new BehaviorSubject<Location | null>(null);
  private nearbyRestaurants$ = new BehaviorSubject<Restaurant[]>([]);
  private userAddress$ = new BehaviorSubject<any>(null);

  constructor() {
    this.initializeSampleRestaurants();
  }

  getCurrentLocation(): Observable<Location | null> {
    return this.currentLocation$.asObservable();
  }

  getNearbyRestaurants(): Observable<Restaurant[]> {
    return this.nearbyRestaurants$.asObservable();
  }

  getUserAddress(): Observable<any> {
    return this.userAddress$.asObservable();
  }

  getLocationFromGPS(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.currentLocation$.next(location);
          this.findNearestRestaurants(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use default location
          this.setDefaultLocation();
        }
      );
    } else {
      console.error('Geolocation is not supported');
      this.setDefaultLocation();
    }
  }

  setDeliveryAddress(address: any): void {
    this.userAddress$.next(address);
  }

  setDefaultLocation(): void {
    const defaultLocation: Location = {
      latitude: 28.7041,
      longitude: 77.1025
    };
    this.currentLocation$.next(defaultLocation);
    this.findNearestRestaurants(defaultLocation);
  }

  private findNearestRestaurants(userLocation: Location): void {
    const sampleRestaurants = this.nearbyRestaurants$.value;
    
    sampleRestaurants.forEach(restaurant => {
      restaurant.distance = this.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        restaurant.latitude,
        restaurant.longitude
      );
    });

    sampleRestaurants.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    this.nearbyRestaurants$.next(sampleRestaurants);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private initializeSampleRestaurants(): void {
    const restaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Pizza Palace',
        address: '123 Main Street, Delhi',
        latitude: 28.7041,
        longitude: 77.1025,
        rating: 4.5,
        openingHours: '10:00 AM - 11:00 PM',
        cuisine: ['Pizza', 'Italian'],
        deliveryTime: 30,
        distance: 2.5
      },
      {
        id: '2',
        name: 'Burger Haven',
        address: '456 Park Avenue, Delhi',
        latitude: 28.7028,
        longitude: 77.1122,
        rating: 4.3,
        openingHours: '11:00 AM - 12:00 AM',
        cuisine: ['Burger', 'American'],
        deliveryTime: 25,
        distance: 3.2
      },
      {
        id: '3',
        name: 'Pasta Paradise',
        address: '789 Restaurant Row, Delhi',
        latitude: 28.6995,
        longitude: 77.0989,
        rating: 4.7,
        openingHours: '12:00 PM - 11:30 PM',
        cuisine: ['Pasta', 'Italian'],
        deliveryTime: 35,
        distance: 4.1
      },
      {
        id: '4',
        name: 'Fusion Kitchen',
        address: '321 Food Court, Delhi',
        latitude: 28.7089,
        longitude: 77.1067,
        rating: 4.4,
        openingHours: '10:30 AM - 11:00 PM',
        cuisine: ['Pizza', 'Burger', 'Pasta'],
        deliveryTime: 28,
        distance: 1.8
      }
    ];

    this.nearbyRestaurants$.next(restaurants);
  }
}
