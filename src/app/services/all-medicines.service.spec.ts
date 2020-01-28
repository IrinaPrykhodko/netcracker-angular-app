import {TestBed} from '@angular/core/testing';

import {MedicineService} from './amedicine.service';

describe('AllMedicinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicineService = TestBed.get(MedicineService);
    expect(service).toBeTruthy();
  });
});
