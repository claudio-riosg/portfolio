import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FloatingIslandBackgroundComponent } from './floating-island-background.component';

describe('FloatingIslandBackgroundComponent', () => {
  let component: FloatingIslandBackgroundComponent;
  let fixture: ComponentFixture<FloatingIslandBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingIslandBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingIslandBackgroundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('isDarkTheme', false);
    fixture.componentRef.setInput('imageUrl', 'test');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the light theme image', () => {
    fixture.componentRef.setInput('isDarkTheme', false);
    fixture.componentRef.setInput('imageUrl', 'test');
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img.floating-island'));
    expect(imgElement.nativeElement.src).toContain('test.webp');
  });

  it('should display the dark theme image', () => {
    fixture.componentRef.setInput('isDarkTheme', true);
    fixture.componentRef.setInput('imageUrl', 'test');
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img.floating-island'));
    expect(imgElement.nativeElement.src).toContain('test-dark.webp');
  });
});
