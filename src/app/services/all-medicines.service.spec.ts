import { TestBed } from '@angular/core/testing';

import { AllMedicinesService } from './all-medicines.service';

describe('AllMedicinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllMedicinesService = TestBed.get(AllMedicinesService);
    expect(service).toBeTruthy();
  });
});
