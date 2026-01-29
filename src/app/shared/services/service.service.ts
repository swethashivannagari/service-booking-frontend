import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Service } from '../models/service.model';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ServiceService {

  private readonly API_URL = `${environment.apiUrl}/api/services`;

  constructor(private http: HttpClient) {}

  getAllServices(page: number = 0, size: number = 100): Observable<ApiResponse<Page<Service>>> {
    return this.http.get<ApiResponse<Page<Service>>>(`${this.API_URL}?page=${page}&size=${size}`);
  }
}

