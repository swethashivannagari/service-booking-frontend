import { TestBed } from '@angular/core/testing';

import { ProviderBookingService } from './provider-booking.service';

describe('ProviderBookingService', () => {
  let service: ProviderBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
