import { TestBed } from '@angular/core/testing';

import { PrescriptionService } from './prescription.service';

describe('PrescriptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrescriptionService = TestBed.get(PrescriptionService);
    expect(service).toBeTruthy();
  });
});
