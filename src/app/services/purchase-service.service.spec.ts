import { TestBed } from '@angular/core/testing';

import { PurchaseServiceService } from './purchase-service.service';

describe('PurchaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseServiceService = TestBed.get(PurchaseServiceService);
    expect(service).toBeTruthy();
  });
});
