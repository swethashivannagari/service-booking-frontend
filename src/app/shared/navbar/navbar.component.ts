import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
role: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
     this.role = this.getRole();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getRole(): string | null {
    return this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  userBooking(): void {
    this.router.navigate(['/user/bookings']);
  }
  

  isUser(): boolean {
    return this.role === 'USER';
  }

  isProvider(): boolean {
    return this.role === 'PROVIDER';
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  goToProfile(): void {
    if (this.isUser()) {
      this.router.navigate(['/user/dashboard']);
    } else if (this.isProvider()) {
      this.router.navigate(['/provider/dashboard']);
    } else if (this.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    }

  }
}
