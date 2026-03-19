import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  error: string = '';
  success: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[+]?[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: any): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      const user: User = {
        firstName: this.f['firstName'].value,
        lastName: this.f['lastName'].value,
        email: this.f['email'].value,
        mobileNumber: this.f['mobileNumber'].value,
        password: this.f['password'].value
      };

      this.authService.register(user).subscribe({
        next: (response) => {
          this.success = 'Registration successful! Redirecting to menu...';
          setTimeout(() => {
            this.router.navigate(['/menu']);
          }, 2000);
        },
        error: (error) => {
          this.error = error.message || 'Registration failed';
          this.loading = false;
        }
      });
    } catch (error: any) {
      this.error = error.message || 'An error occurred';
      this.loading = false;
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return `${fieldName} is required`;
    }
    if (field.errors['minlength']) {
      return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    if (field.errors['email']) {
      return 'Invalid email format';
    }
    if (field.errors['pattern']) {
      if (fieldName === 'mobileNumber') {
        return 'Mobile number must be 10-15 digits';
      }
    }
    
    return 'Invalid input';
  }
}

