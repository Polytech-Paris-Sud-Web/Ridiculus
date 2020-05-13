import { TestBed } from '@angular/core/testing';

import { OfflineDBService } from './offline-db.service';

describe('OfflineDBService', () => {
  let service: OfflineDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
