import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TocComponent } from './toc.component';

describe('TocComponent', () => {
  let component: TocComponent;
  let fixture: ComponentFixture<TocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TocComponent);
    component = fixture.componentInstance;
    // Set sample sections for testing
    component.sections = [
      { id: 'section1', title: 'Introduction', completed: true },
      { id: 'section2', title: 'Getting Started', completed: false },
      { id: 'section3', title: 'Advanced Topics', completed: false },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the table of contents title', () => {
    const titleElement = fixture.debugElement.query(By.css('.toc-title'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toBe('Table of Contents');
  });

  it('should render all sections as links', () => {
    const tocItems = fixture.debugElement.queryAll(By.css('.toc-item'));
    expect(tocItems.length).toBe(3);

    const links = fixture.debugElement.queryAll(By.css('.toc-link'));
    expect(links.length).toBe(3);

    expect(links[0].nativeElement.textContent.trim()).toBe('Introduction');
    expect(links[1].nativeElement.textContent.trim()).toBe('Getting Started');
    expect(links[2].nativeElement.textContent.trim()).toBe('Advanced Topics');
  });

  it('should generate the correct href attributes', () => {
    const links = fixture.debugElement.queryAll(By.css('.toc-link'));
    expect(links[0].nativeElement.getAttribute('href')).toBe('#section1');
    expect(links[1].nativeElement.getAttribute('href')).toBe('#section2');
    expect(links[2].nativeElement.getAttribute('href')).toBe('#section3');
  });

  it('should apply completed class to completed sections', () => {
    const links = fixture.debugElement.queryAll(By.css('.toc-link'));
    expect(links[0].nativeElement.classList.contains('completed')).toBe(true);
    expect(links[1].nativeElement.classList.contains('completed')).toBe(false);
    expect(links[2].nativeElement.classList.contains('completed')).toBe(false);
  });

  it('should have a scroll to top link', () => {
    const scrollTopLink = fixture.debugElement.query(By.css('.scroll-top'));
    expect(scrollTopLink).toBeTruthy();
    expect(scrollTopLink.nativeElement.getAttribute('href')).toBe('#');
    expect(scrollTopLink.nativeElement.textContent.trim()).toContain('↟');
  });
});
