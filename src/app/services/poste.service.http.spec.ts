import { TestBed } from '@angular/core/testing';

import { PosteServiceHTTP } from './poste.service.http';

describe('PosteServiceHTTP', () => {
  let service: PosteServiceHTTP;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteServiceHTTP);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
