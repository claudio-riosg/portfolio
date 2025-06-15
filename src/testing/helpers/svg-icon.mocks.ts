import { of } from 'rxjs';
import { signal } from '@angular/core';

export const sanitizerMock = {
  bypassSecurityTrustResourceUrl: jest.fn().mockReturnValue('safe-resource-url'),
  bypassSecurityTrustHtml: jest.fn().mockReturnValue('safe-html')
};

export const iconLoaderMock = {
  loadIcon: jest.fn().mockReturnValue(of('safe-html')),
  loadSprite: jest.fn().mockReturnValue(of('safe-html')),
  spriteReady: signal(true),
}; 