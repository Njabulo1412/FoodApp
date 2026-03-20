import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review.model';

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Rajesh Kumar',
    rating: 5,
    text: 'Great app! Easy to use and very fast delivery. Highly recommend!',
    createdAt: new Date('2025-11-08T08:30:00Z').toISOString()
  },
  {
    id: 'rev-2',
    authorName: 'Priya Singh',
    rating: 5,
    text: 'I love the customization options. My orders are always exactly as I want them.',
    createdAt: new Date('2025-12-02T13:15:00Z').toISOString()
  },
  {
    id: 'rev-3',
    authorName: 'Amit Patel',
    rating: 5,
    text: 'Click & Collect is so convenient! No more waiting at home for delivery.',
    createdAt: new Date('2026-02-18T09:45:00Z').toISOString()
  }
];

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly storageKey = 'lollysReviews';
  private reviewsSubject = new BehaviorSubject<Review[]>(this.loadReviews());

  getReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  submitReview(review: Omit<Review, 'id' | 'createdAt'>): void {
    const newReview: Review = {
      ...review,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    const updated = [...this.reviewsSubject.value, newReview];
    this.saveReviews(updated);
  }

  private saveReviews(reviews: Review[]): void {
    this.reviewsSubject.next(reviews);
    localStorage.setItem(this.storageKey, JSON.stringify(reviews));
  }

  private loadReviews(): Review[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [...DEFAULT_REVIEWS];
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to load stored reviews, falling back to defaults.', error);
      localStorage.removeItem(this.storageKey);
      return [...DEFAULT_REVIEWS];
    }
  }

  private generateId(): string {
    return 'rev-' + Math.random().toString(36).substr(2, 9);
  }
}
