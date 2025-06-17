import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import '@testing/helpers/intersection-observer.mock';

// Setup test zone environment
setupZoneTestEnv();

// Global mocks for testing
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

// Mock for Element.prototype.animate
if (typeof Element !== 'undefined') {
  Element.prototype.animate = jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    cancel: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    finish: jest.fn(),
    onfinish: null,
    currentTime: 0,
    startTime: null,
    playbackRate: 1,
    playState: 'idle',
    pending: false,
  });
}

// Mock for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
    getPropertyValue: () => ''
  })
});

// Mock for localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
});

// Provide default test providers
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideNoopAnimations()
    ]
  });
}); 