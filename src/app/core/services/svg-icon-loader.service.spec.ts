import { TestBed } from '@angular/core/testing';
import { SvgIconLoaderService } from './svg-icon-loader.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { httpMock, sanitizerMock } from '@testing/helpers/svg-icon-loader.mocks';

describe('SvgIconLoaderService', () => {
  let service: SvgIconLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: HttpClient, useValue: httpMock },
        { provide: DomSanitizer, useValue: sanitizerMock },
      ],
    });
    service = TestBed.inject(SvgIconLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get and sanitizer for loadIcon', (done) => {
    service.loadIcon('angular.svg').subscribe((result) => {
      expect(httpMock.get).toHaveBeenCalledWith('/icons/angular.svg', { responseType: 'text' as 'text' });
      expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalled();
      expect(result).toBe(
        '<svg width="24px" height="24px" fill="currentColor"></svg>'
      );
      done();
    });
  });

  it('should call http.get and sanitizer for loadSprite', (done) => {
    service.loadSprite('/icons/sprite.svg').subscribe((result) => {
      expect(httpMock.get).toHaveBeenCalledWith('/icons/sprite.svg', { responseType: 'text' as 'text' });
      expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalled();
      expect(result).toBe('<svg></svg>');
      done();
    });
  });
});
