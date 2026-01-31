import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { BookingRequest } from '../models/booking-request.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
 private readonly API_URL = `${environment.apiUrl}/api/bookings`;
 private idempotencyKey: string | null = null;

  constructor(private http: HttpClient) {}

  createBooking(request: BookingRequest): Observable<ApiResponse<any>> {
    if (!this.idempotencyKey) {
      this.idempotencyKey = crypto.randomUUID();
    }
    return this.http.post<ApiResponse<any>>(this.API_URL, request,{headers:{'idempotencyKey':this.idempotencyKey}});
  }

  resetIdempotencyKey() {
    this.idempotencyKey = null;
  }

  cancelBooking(bookingId: string) {
  return this.http.put<ApiResponse<any>>(
    `${this.API_URL}/${bookingId}/cancel`,
    {}
  );
}
getUserBookings(page: number = 0, size: number = 5) {
  return this.http.get<ApiResponse<Page<any>>>(
    `${this.API_URL}/user?page=${page}&size=${size}`
  );
}

 
}
