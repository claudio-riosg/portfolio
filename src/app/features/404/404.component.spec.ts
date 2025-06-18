import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './404.component';
import { AnimatedAvatarComponent } from '@app/shared/ui/animated-avatar/animated-avatar.component';
import { ThemeService } from '@app/core/services/theme.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let component: NotFoundComponent;
  let themeServiceMock: Partial<ThemeService>;

  beforeEach(async () => {
    themeServiceMock = {
      isDark: signal(false)
    };
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, AnimatedAvatarComponent, RouterTestingModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the 404 message and link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.not-found-title')?.textContent).toContain('404');
    expect(compiled.querySelector('.not-found-message')?.textContent).toContain('Page Not Found');
    const link = compiled.querySelector('.not-found-link') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerlink')).toBe('/home');
  });

  it('should render two desktop avatars and one mobile avatar', () => {
    const desktopAvatars = fixture.debugElement.queryAll(By.css('.animated-avatar-desktop'));
    const mobileAvatars = fixture.debugElement.queryAll(By.css('.animated-avatar-mobile'));
    expect(desktopAvatars.length).toBe(2);
    expect(mobileAvatars.length).toBe(1);
  });

  it('should pass isDark to all avatars', () => {
    themeServiceMock.isDark = signal(true);
    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    const avatars = fixture.debugElement.queryAll(By.directive(AnimatedAvatarComponent));
    avatars.forEach(avatar => {
      expect(avatar.componentInstance.isDark).toBe(true);
    });
  });

  // Responsive layout test (simulate mobile by checking class presence)
  it('should have correct classes for layout', () => {
    const wrapper = fixture.debugElement.query(By.css('.not-found-wrapper'));
    expect(wrapper).toBeTruthy();
    const section = fixture.debugElement.query(By.css('.not-found-container'));
    expect(section).toBeTruthy();
  });
}); 