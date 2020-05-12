import { TestBed } from '@angular/core/testing';

import { SynchroDbService } from './synchro-db.service';

describe('SynchroDbService', () => {
  let service: SynchroDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynchroDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
