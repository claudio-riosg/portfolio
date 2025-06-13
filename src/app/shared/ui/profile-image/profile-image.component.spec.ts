import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProfileImageComponent } from './profile-image.component';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    
    // Set default input values
    component.imageUrl = 'test-image.jpg';
    component.altText = 'Test Alt Text';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render an image with the provided URL', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.src).toContain('test-image.jpg');
  });
  
  it('should set the alt text correctly', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.nativeElement.alt).toBe('Test Alt Text');
  });
  
  it('should update the image when inputs change', () => {
    // Change the input values
    component.imageUrl = 'new-image.jpg';
    component.altText = 'New Alt Text';
    
    // Trigger change detection
    fixture.detectChanges();
    
    // Check that the image was updated
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.nativeElement.src).toContain('new-image.jpg');
    expect(imgElement.nativeElement.alt).toBe('New Alt Text');
  });
});
