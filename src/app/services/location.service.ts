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
        id: 'lollys',
        name: "Lolly's",
        address: 'Durban, South Africa',
        latitude: -33.9249,
        longitude: 18.4241,
        rating: 5.0,
        openingHours: '08:00 AM - 11:59 PM',
        cuisine: ['Fast Food', 'Snacks'],
        deliveryTime: 25,
        distance: 2.1
      }
    ];

    this.nearbyRestaurants$.next(restaurants);
  }
}
