import { TestBed } from '@angular/core/testing';

import { SvgIconLoaderService } from './svg-icon-loader.service';

describe('SvgIconLoaderService', () => {
  let service: SvgIconLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgIconLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
