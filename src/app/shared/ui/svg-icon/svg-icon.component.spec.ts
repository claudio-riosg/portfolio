import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './svg-icon.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconLoaderService } from '../../../core/services/svg-icon-loader.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { sanitizerMock, iconLoaderMock } from '@testing/helpers/svg-icon.mocks';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: DomSanitizer, useValue: sanitizerMock },
        { provide: SvgIconLoaderService, useValue: iconLoaderMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default config values', () => {
    const defaultConfig = component.currentConfig();
    expect(defaultConfig.spritePath).toBe('icons/sprite.svg');
    expect(defaultConfig.size).toBe('24px');
    expect(defaultConfig.color).toBe('currentColor');
    expect(defaultConfig.strokeColor).toBe('none');
    expect(defaultConfig.strokeWidth).toBe('0');
    expect(defaultConfig.hoverable).toBe(true);
    expect(defaultConfig.darkMode).toBe(false);
  });

  it('should use provided config values', () => {
    const customConfig = {
      name: 'test-icon',
      spritePath: 'custom/path.svg',
      size: '32px',
      color: 'red',
      strokeColor: 'blue',
      strokeWidth: '2',
      hoverable: false,
      darkMode: true
    };
    fixture.componentRef.setInput('config', customConfig);
    fixture.detectChanges();
    const resultConfig = component.currentConfig();
    expect(resultConfig.name).toBe('test-icon');
    expect(resultConfig.spritePath).toBe('custom/path.svg');
    expect(resultConfig.size).toBe('32px');
    expect(resultConfig.color).toBe('red');
    expect(resultConfig.strokeColor).toBe('blue');
    expect(resultConfig.strokeWidth).toBe('2');
    expect(resultConfig.hoverable).toBe(false);
    expect(resultConfig.darkMode).toBe(true);
  });

  it('should call loadIcon when external is true', () => {
    fixture.componentRef.setInput('external', true);
    fixture.componentRef.setInput('config', { name: 'angular' });
    fixture.detectChanges();
    expect(iconLoaderMock.loadIcon).toHaveBeenCalledWith('angular.svg', 'icons', '24px', 'currentColor');
  });

  it('should call loadSprite when spriteExternal is true', () => {
    fixture.componentRef.setInput('spriteExternal', true);
    fixture.componentRef.setInput('config', { name: 'angular', spritePath: '/icons/sprite.svg' });
    fixture.detectChanges();
    expect(iconLoaderMock.loadSprite).toHaveBeenCalledWith('/icons/sprite.svg');
  });
});
