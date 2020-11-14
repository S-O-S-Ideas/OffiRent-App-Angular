import { TestBed } from '@angular/core/testing';

import { HttpDataOfficeService } from './http-data-office.service';

describe('HttpDataOfficeService', () => {
  let service: HttpDataOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
