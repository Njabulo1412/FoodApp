import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { ReviewService } from '../../services/review.service';
import { MenuItem, Topping } from '../../models/menu.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LANDINGPAGEComponent implements OnInit {
  isAuthenticated = false;
  currentUser: any = null;
  menuPreview: MenuItem[] = [];
  reviews: Review[] = [];
  reviewStars = [1, 2, 3, 4, 5];
  reviewRating = 0;
  reviewerName = '';
  reviewText = '';
  reviewSuccess = '';
  reviewError = '';
  heroSearchTerm = '';
  heroSearchResults: MenuItem[] = [];
  allMenuItems: MenuItem[] = [];
  heroSearchSearched = false;
  heroSearchMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    });

    // Load full menu and keep a small preview
    this.menuService.getMenuItems().subscribe(items => {
      this.allMenuItems = items;
      this.menuPreview = items.slice(0, 4);
      if (items.length > 0) {
        this.quickOrderItemId = items[0].id;
      }
    });

    this.reviewService.getReviews().subscribe((reviewList: Review[]) => {
      this.reviews = [...reviewList].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    });
  }

  getToppingNames(toppings: Topping[]): string {
    return toppings.map(topping => topping.name).join(', ');
  }

  goToMenu(): void {
    // Allow unauthenticated users to view the menu. They can still be prompted to login
    // when attempting actions that require authentication (checkout, order history, etc.).
    this.router.navigate(['/menu']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  setReviewRating(rating: number): void {
    this.reviewRating = rating;
  }

  get averageRating(): number {
    if (!this.reviews.length) {
      return 0;
    }
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / this.reviews.length;
  }

  submitReview(): void {
    this.reviewError = '';
    this.reviewSuccess = '';

    if (this.reviewRating === 0) {
      this.reviewError = 'Select how many stars you want to give.';
      return;
    }

    if (!this.reviewText.trim()) {
      this.reviewError = 'Add a short note about your experience.';
      return;
    }

    this.reviewService.submitReview({
      authorName: this.reviewerName.trim() || 'Anonymous',
      rating: this.reviewRating,
      text: this.reviewText.trim()
    });

    this.reviewText = '';
    this.reviewerName = '';
    this.reviewRating = 0;
    this.reviewSuccess = 'Thanks for your feedback!';
    setTimeout(() => this.reviewSuccess = '', 4000);
  }

  searchHeroMenu(): void {
    this.heroSearchSearched = true;
    this.heroSearchMessage = '';
    const term = this.heroSearchTerm.trim().toLowerCase();
    if (!term) {
      this.heroSearchResults = [];
      this.heroSearchMessage = 'Search the full menu by typing something above.';
      return;
    }

    this.heroSearchResults = this.allMenuItems.filter(item => {
      const searchable = `${item.name} ${item.description} ${item.category}`.toLowerCase();
      return searchable.includes(term);
    });

    if (!this.heroSearchResults.length) {
      this.heroSearchMessage = `No menu items match “${this.heroSearchTerm.trim()}”. Try another keyword.`;
    }
  }

}
