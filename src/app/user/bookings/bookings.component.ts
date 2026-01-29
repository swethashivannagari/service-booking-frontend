import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../shared/services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];

  selectedTab: 'ACTIVE' | 'HISTORY' = 'ACTIVE';
  errorMessage = '';


currentPage = 0;
pageSize = 5;
totalPages = 0;

loading = false;


  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

 loadBookings(): void {
  this.loading = true;

  this.bookingService
    .getUserBookings(this.currentPage, this.pageSize)
    .subscribe({
      next: res => {
        this.bookings = res.data.content;      
        this.totalPages = res.data.totalPages;
        this.loading = false;
      },
      error: err => {
        this.errorMessage =
          err?.error?.message || 'Failed to load bookings';
        this.loading = false;
      }
    });
}


  applyFilter(): void {
    if (this.selectedTab === 'ACTIVE') {
      this.filteredBookings = this.bookings.filter(b =>
        b.status === 'REQUESTED' || b.status === 'ACCEPTED'
      );
    } else {
      this.filteredBookings = this.bookings.filter(b =>
        b.status === 'COMPLETED' || b.status === 'CANCELLED'
      );
    }
  }

  switchTab(tab: 'ACTIVE' | 'HISTORY'): void {
    this.selectedTab = tab;
    this.applyFilter();
  }

  cancelBooking(id: string): void {
    this.bookingService.cancelBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: err => {
        this.errorMessage =
          err?.error?.message || 'Unable to cancel booking';
      }
    });
  }
}

