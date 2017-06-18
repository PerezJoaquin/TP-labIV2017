import { TestBed, inject } from '@angular/core/testing';

import { ReservasService } from './reservas.service';

describe('ReservasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservasService]
    });
  });

  it('should be created', inject([ReservasService], (service: ReservasService) => {
    expect(service).toBeTruthy();
  }));
});
