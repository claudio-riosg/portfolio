import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should apply the correct classes based on config', () => {
    // Default config
    let buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.classList.contains('btn')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('btn-primary')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('btn-md')).toBe(true);
    
    // Change config to outline button
    component.config = {
      type: 'outline',
      size: 'sm',
      disabled: false,
      loading: false
    };
    fixture.detectChanges();
    
    buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.classList.contains('btn-outline')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('btn-sm')).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('btn-primary')).toBe(false);
  });
  
  it('should disable the button when disabled is true', () => {
    component.config = {
      type: 'primary',
      size: 'md',
      disabled: true,
      loading: false
    };
    fixture.detectChanges();
    
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl.nativeElement.disabled).toBe(true);
    expect(buttonEl.nativeElement.classList.contains('disabled')).toBe(true);
  });
  
  it('should show loading text when loading is true', () => {
    component.config = {
      type: 'primary',
      size: 'md',
      disabled: false,
      loading: true
    };
    fixture.detectChanges();
    
    const loadingSpan = fixture.debugElement.query(By.css('span'));
    expect(loadingSpan).toBeTruthy();
    expect(loadingSpan.nativeElement.textContent).toBe('Loading...');
    expect(fixture.debugElement.query(By.css('button')).nativeElement.classList.contains('loading')).toBe(true);
  });
  
  it('should emit clicked event when button is clicked', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    
    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();
    
    expect(spy).toHaveBeenCalled();
  });
  
  it('should not emit clicked event when button is disabled', () => {
    component.config = {
      type: 'primary',
      size: 'md',
      disabled: true,
      loading: false
    };
    fixture.detectChanges();
    
    const spy = jest.spyOn(component.clicked, 'emit');
    
    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();
    
    expect(spy).not.toHaveBeenCalled();
  });
  
  it('should not emit clicked event when button is loading', () => {
    component.config = {
      type: 'primary',
      size: 'md',
      disabled: false,
      loading: true
    };
    fixture.detectChanges();
    
    const spy = jest.spyOn(component.clicked, 'emit');
    
    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();
    
    expect(spy).not.toHaveBeenCalled();
  });
});
