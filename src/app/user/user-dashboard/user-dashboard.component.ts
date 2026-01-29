import { Component } from '@angular/core';
import { Service } from '../../shared/models/service.model';
import { ServiceService } from '../../shared/services/service.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../shared/services/booking.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  services: Service[] = [];
  selectedService: Service | null = null;
  scheduledTime = '';
  loading = true;
  errorMessage: any;
  selectedDate = '';
  selectedTime = '';
  userBookings: any[] = [];
  currentPage = 0;
pageSize = 5;
totalPages = 0;


  timeSlots: string[] = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];


  constructor(private serviceService: ServiceService, private bookingService: BookingService,private router: Router) { }

  ngOnInit(): void {
    this.loadServices();
 
  }

  loadServices(): void {
     this.serviceService.getAllServices().subscribe({
      next: (res) => {
        this.services = res.data.content;
        this.totalPages = res.data.totalPages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  openBooking(service: Service): void {
    this.selectedService = service;
  }

  confirmBooking(): void {
    if (!this.selectedDate || !this.selectedTime || !this.selectedService) {
      return;
    }

    const scheduledTime = `${this.selectedDate}T${this.selectedTime}:00`;

    this.bookingService.createBooking({
      serviceId: this.selectedService.id,
      scheduledTime
    }).subscribe({
      next: () => {
        alert("Booking requested successfully");
        this.selectedService = null;
        this.scheduledTime = '';
        this.loading = false;
        this.router.navigate(['/user/bookings']);
      },

      error: (err) => {
        this.errorMessage = err.error.message || 'Booking failed';
        alert('Booking failed' + this.errorMessage);

        this.loading = false;
      }
    })
  }

 



}


