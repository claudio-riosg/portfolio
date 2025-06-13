import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './svg-icon.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let sanitizerMock: { bypassSecurityTrustResourceUrl: jest.Mock };

  beforeEach(async () => {
    sanitizerMock = {
      bypassSecurityTrustResourceUrl: jest.fn().mockReturnValue('safe-resource-url')
    };

    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [
        { provide: DomSanitizer, useValue: sanitizerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sanitize the sprite path', () => {
    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
    expect(component.basePath()).toBe('safe-resource-url');
  });

  it('should use default values when not provided', () => {
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
});
