import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../shared/models/booking.model';
import { ProviderBookingService } from '../../shared/services/provider-booking.service';

@Component({
  standalone: true,
  selector: 'app-provider-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './provider-dashboard.component.html'
})
export class ProviderDashboardComponent implements OnInit {

  bookings: Booking[] = [];
  errorMessage = '';

  constructor(private bookingService: ProviderBookingService) {}
  
currentPage = 0;
pageSize = 5;
totalPages = 0;

loading = false;
filteredBookings: any[] = [];

selectedTab: 'ACTIVE' | 'HISTORY' = 'ACTIVE';


  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService
    .getProviderBookings(this.currentPage, this.pageSize)
    .subscribe({
      next: res => {
        this.bookings = res.data.content;      
        this.totalPages = res.data.totalPages;
        this.loading = false;
    
      this.applyFilter();

      },
      error: err => {
        this.errorMessage =
          err?.error?.message || 'Failed to load bookings';
        this.loading = false;
      }
    });
  }

  accept(id: string): void {
    this.bookingService.acceptBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }

  complete(id: string): void {
    this.bookingService.completeBooking(id).subscribe(() => {
      this.loadBookings();
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
}
