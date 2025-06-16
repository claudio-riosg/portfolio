import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceCardComponent } from './experience-card.component';
import { By } from '@angular/platform-browser';
import { WorkExperience } from '@app/core/models/work-experience.interface';

describe('ExperienceCardComponent', () => {
  let component: ExperienceCardComponent;
  let fixture: ComponentFixture<ExperienceCardComponent>;

  const mockExperience: WorkExperience = {
    company: 'Test Company',
    title: 'Test Title',
    period: '2020 - 2022',
    summary: 'Test summary for the experience card.',
    details: [
      'First detail',
      'Second detail',
      'Third detail',
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperienceCardComponent);
    component = fixture.componentInstance;
    component.experience = mockExperience;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render company, title, period, and summary', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.company')?.textContent).toContain('Test Company');
    expect(compiled.querySelector('.role')?.textContent).toContain('Test Title');
    expect(compiled.querySelector('.period')?.textContent).toContain('2020 - 2022');
    expect(compiled.querySelector('.summary')?.textContent).toContain('Test summary');
  });

  it('should render all details as list items', () => {
    const items = fixture.debugElement.queryAll(By.css('.details li'));
    expect(items.length).toBe(mockExperience.details.length);
    items.forEach((item, idx) => {
      expect(item.nativeElement.textContent).toContain(mockExperience.details[idx]);
    });
  });

  it('should be responsive (snapshot for different widths)', () => {
    (fixture.nativeElement as HTMLElement).style.width = '350px';
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
    (fixture.nativeElement as HTMLElement).style.width = '700px';
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
    (fixture.nativeElement as HTMLElement).style.width = '1024px';
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
}); 