import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, LoginRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() { }

  register(user: User): Observable<AuthResponse> {
    // Simulate API call
    if (!this.isValidEmail(user.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!this.isValidMobileNumber(user.mobileNumber)) {
      throw new Error('Invalid mobile number');
    }
    
    if (!user.password || user.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    const newUser: User = {
      id: this.generateId(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      createdAt: new Date()
    };

    const response: AuthResponse = {
      user: newUser,
      token: this.generateToken()
    };

    this.saveUserToLocalStorage(newUser, response.token);
    this.currentUserSubject.next(newUser);

    return of(response);
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    // Simulate API call
    const user: User = {
      id: this.generateId(),
      firstName: 'John',
      lastName: 'Doe',
      email: loginRequest.email,
      mobileNumber: '+1234567890'
    };

    const response: AuthResponse = {
      user,
      token: this.generateToken()
    };

    this.saveUserToLocalStorage(user, response.token);
    this.currentUserSubject.next(user);

    return of(response);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidMobileNumber(mobile: string): boolean {
    const mobileRegex = /^[+]?[0-9]{10,15}$/;
    return mobileRegex.test(mobile);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 20);
  }

  private saveUserToLocalStorage(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
  }
}
