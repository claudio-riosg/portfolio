import { TestBed } from '@angular/core/testing';

import { NetworkIdleService } from './network-idle.service';

describe('NetworkIdleService', () => {
  let service: NetworkIdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkIdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
