import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { NavLinksComponent } from './nav-links.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

// Define mock routes that match the ones used in the component
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: class {} },
  { path: 'about', component: class {} },
  { path: 'projects', component: class {} },
  { path: 'contact', component: class {} },
  { path: 'blog', component: class {} }
];

describe('NavLinksComponent', () => {
  let component: NavLinksComponent;
  let fixture: ComponentFixture<NavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavLinksComponent,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinksComponent);
    component = fixture.componentInstance;
    
    // Mock required inputs
    component.isMobileView = signal(false);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(component.links.length);
  });

  it('should emit linkClick event when a link is clicked', () => {
    // Spy on the linkClick event
    jest.spyOn(component.linkClick, 'emit');
    
    // Get the first link and click it
    const firstLink = fixture.debugElement.query(By.css('a'));
    firstLink.nativeElement.click();
    
    // Check if the event was emitted
    expect(component.linkClick.emit).toHaveBeenCalled();
  });

  it('should apply mobile-open class when mobileMenuOpen is true', () => {
    // Create a new test for this specific case
    const testFixture = TestBed.createComponent(NavLinksComponent);
    const testComponent = testFixture.componentInstance;
    
    // Set up required inputs
    testComponent.isMobileView = signal(false);
    testComponent.mobileMenuOpen = true;
    
    // Force change detection
    testFixture.detectChanges();
    
    // Get the nav element directly
    const navElement = testFixture.nativeElement.querySelector('nav');
    expect(navElement.classList.contains('mobile-open')).toBe(true);
  });
});
