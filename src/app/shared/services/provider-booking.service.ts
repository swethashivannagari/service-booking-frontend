import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { Booking } from '../models/booking.model';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProviderBookingService {

private readonly API_URL = `${environment.apiUrl}/api/bookings`;

  constructor(private http: HttpClient) {}

  getProviderBookings(page: number = 0, size: number = 5) {
    return this.http.get<ApiResponse<Page<any>>>(
      `${this.API_URL}/provider?page=${page}&size=${size}`
    );
  }

  acceptBooking(id: string) {
    return this.http.put<ApiResponse<any>>(
      `${this.API_URL}/${id}/accept`, {}
    );
  }

  completeBooking(id: string) {
    return this.http.put<ApiResponse<any>>(
      `${this.API_URL}/${id}/complete`, {}
    );
  }
}
