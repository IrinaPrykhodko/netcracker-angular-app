import {TestBed} from '@angular/core/testing';

import {MedicineKitService} from './medicine-kit.service';

describe('MedicineKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicineKitService = TestBed.get(MedicineKitService);
    expect(service).toBeTruthy();
  });
});
