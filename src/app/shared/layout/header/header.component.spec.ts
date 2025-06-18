import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { HeaderComponent } from './header.component';
import {
  MockNavLinksComponent,
  MockLogoComponent,
  MockThemeToggleComponent,
} from '@testing/mocks';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MockNavLinksComponent,
        MockLogoComponent,
        MockThemeToggleComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Mock window functions
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close menu when escape key is pressed', () => {
    // Open the menu first
    component.toggleMenu();
    expect(component.menuOpen()).toBe(true);

    // Simulate Escape key press
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);

    // Menu should be closed
    expect(component.menuOpen()).toBe(false);
  });

  it('should detect mobile view based on window width', () => {
    // Start with desktop width
    expect(component.isMobileView()).toBe(false);

    // Change to mobile width
    window.innerWidth = 600;
    window.dispatchEvent(new Event('resize'));

    // Should detect mobile view
    expect(component.isMobileView()).toBe(true);
  });

  it('should detect scroll position and apply scrolled class', () => {
    // Start with no scroll
    expect(component.isScrolled()).toBe(false);

    // Simulate scrolling
    window.scrollY = 20;
    window.dispatchEvent(new Event('scroll'));

    // Should detect scrolled state
    expect(component.isScrolled()).toBe(true);
  });
});
