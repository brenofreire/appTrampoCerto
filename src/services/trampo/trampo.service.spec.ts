import { TestBed } from '@angular/core/testing';

import { TrampoService } from './trampo.service';

describe('TrampoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrampoService = TestBed.get(TrampoService);
    expect(service).toBeTruthy();
  });
});
