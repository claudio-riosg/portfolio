import { of } from 'rxjs';

export const httpMock = {
  get: jest.fn().mockReturnValue(of('<svg></svg>'))
};

export const sanitizerMock = {
  bypassSecurityTrustHtml: jest.fn().mockImplementation((v) => v)
}; 