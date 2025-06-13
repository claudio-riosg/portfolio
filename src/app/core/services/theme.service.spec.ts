import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(
      (key) => localStorageMock[key] || null
    );
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(
      (key, value) => {
        localStorageMock[key] = value;
      }
    );

    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should default to light theme when no preference is stored', () => {
    service = TestBed.inject(ThemeService);
    expect(service.currentTheme()).toBe('light');
  });

  it('should use dark theme when system prefers dark mode', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    service = TestBed.inject(ThemeService);
    expect(service.currentTheme()).toBe('dark');
  });

  it('should use stored theme preference when available', () => {
    localStorageMock['theme'] = 'dark';
    
    service = TestBed.inject(ThemeService);
    expect(service.currentTheme()).toBe('dark');
    
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    
    expect(service.isDark()).toBe(false);
  });
});
