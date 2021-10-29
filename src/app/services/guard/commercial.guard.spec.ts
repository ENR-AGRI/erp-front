import { TestBed, async, inject } from '@angular/core/testing';

import { CommercialGuard } from './commercial.guard';

describe('CommercialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommercialGuard]
    });
  });

  it('should ...', inject([CommercialGuard], (guard: CommercialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
