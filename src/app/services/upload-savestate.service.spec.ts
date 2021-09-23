import { TestBed } from '@angular/core/testing';

import { UploadSavestateService } from './upload-savestate.service';

describe('UploadSavestateService', () => {
  let service: UploadSavestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSavestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
