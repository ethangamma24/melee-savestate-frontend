import { TestBed } from '@angular/core/testing';

import { SavestateDetailsService } from './savestate-details.service';

describe('SavestateDetailsService', () => {
  let service: SavestateDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavestateDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
