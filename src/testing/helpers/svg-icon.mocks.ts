import { of } from 'rxjs';

export const sanitizerMock = {
  bypassSecurityTrustResourceUrl: jest.fn().mockReturnValue('safe-resource-url'),
  bypassSecurityTrustHtml: jest.fn().mockReturnValue('safe-html')
};

export const iconLoaderMock = {
  loadIcon: jest.fn().mockReturnValue(of('safe-html')),
  loadSprite: jest.fn().mockReturnValue(of('safe-html'))
}; 