import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimatedAvatarComponent } from './animated-avatar.component';

describe('AnimatedAvatarComponent', () => {
  let component: AnimatedAvatarComponent;
  let fixture: ComponentFixture<AnimatedAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedAvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimatedAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the avatar image', () => {
    const imgElement = fixture.debugElement.query(By.css('img.hero-avatar'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.src).toContain('/images/main.svg');
    expect(imgElement.nativeElement.alt).toBe('Avatar');
  });
  
  it('should have default sensitivity and clickEffect values', () => {
    expect(component.sensitivity).toBe(15);
    expect(component.clickEffect).toBe(true);
  });
  
  it('should apply transform styles to the avatar container', () => {
    const containerElement = fixture.debugElement.query(By.css('.avatar-container'));
    expect(containerElement).toBeTruthy();
    expect(containerElement.nativeElement.style.transform).toContain('translate(0px, 0px)');
    expect(containerElement.nativeElement.style.transform).toContain('rotate(0deg)');
    expect(containerElement.nativeElement.style.transform).toContain('scale(1)');
  });
  
  it('should update position and rotation on mouse move', () => {
    // Mock getBoundingClientRect to return fixed values
    const mockRect = { left: 50, top: 50, width: 100, height: 100 };
    jest.spyOn(fixture.nativeElement, 'getBoundingClientRect').mockReturnValue(mockRect);
    
    // Simulate mouse move event
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 150
    });
    
    document.dispatchEvent(mouseEvent);
    
    // Calculate expected values
    const centerX = mockRect.left + mockRect.width / 2; // 100
    const centerY = mockRect.top + mockRect.height / 2; // 100
    const expectedX = (mouseEvent.clientX - centerX) / component.sensitivity; // (200 - 100) / 15 = 6.67
    const expectedY = (mouseEvent.clientY - centerY) / component.sensitivity; // (150 - 100) / 15 = 3.33
    
    // Check position and rotation were updated
    expect(component.position.x).toBeCloseTo(expectedX, 1);
    expect(component.position.y).toBeCloseTo(expectedY, 1);
    expect(component.rotation).toBeCloseTo(expectedX * 0.5, 1);
  });
  
  it('should apply scale effect on click', () => {
    // Mock setTimeout
    jest.useFakeTimers();
    
    // Check initial scale
    expect(component.scale).toBe(1);
    
    // Trigger click
    const containerElement = fixture.debugElement.query(By.css('.avatar-container'));
    containerElement.nativeElement.click();
    
    // Check scale after click
    expect(component.scale).toBe(0.9);
    
    // Advance timers
    jest.advanceTimersByTime(300);
    
    // Check scale after timeout
    expect(component.scale).toBe(1);
    
    // Restore timers
    jest.useRealTimers();
  });
  
  it('should not apply scale effect when clickEffect is false', () => {
    // Set clickEffect to false
    component.clickEffect = false;
    
    // Mock setTimeout
    jest.useFakeTimers();
    
    // Check initial scale
    expect(component.scale).toBe(1);
    
    // Trigger click
    const containerElement = fixture.debugElement.query(By.css('.avatar-container'));
    containerElement.nativeElement.click();
    
    // Check scale after click (should still be 1)
    expect(component.scale).toBe(1);
    
    // Restore timers
    jest.useRealTimers();
  });
});
