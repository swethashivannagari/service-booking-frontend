import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Attempting login with:', this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        const loginResponse = response.data;
        this.authService.storeAuthData(loginResponse);
        console.log('Login successful:', response);

        // Role-based navigation
        switch (loginResponse.role) {
          case 'USER':
            this.router.navigate(['/user/dashboard']);
            break;
          case 'PROVIDER':
            this.router.navigate(['/provider/dashboard']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin/dashboard']);
            break;
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
        this.isLoading = false;
      }
    });
  }
}


