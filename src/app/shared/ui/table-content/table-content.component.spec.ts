import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableContentComponent } from './table-content.component';

describe('TableContentComponent', () => {
  let component: TableContentComponent;
  let fixture: ComponentFixture<TableContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableContentComponent);
    component = fixture.componentInstance;
    // Set sample test data
    component.headers = ['Name', 'Age', 'Location'];
    component.rows = [
      [{ text: 'John' }, { text: '30' }, { text: 'New York' }],
      [{ text: 'Jane' }, { text: '25' }, { text: 'London' }],
      [{ text: 'Bob' }, { text: '40' }, { text: 'Paris', link: 'https://example.com' }]
    ];
    component.columnWidths = ['2', '1', '2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render headers correctly', () => {
    const headerCells = fixture.debugElement.queryAll(By.css('.table-row.header .table-cell'));
    expect(headerCells.length).toBe(3);
    expect(headerCells[0].nativeElement.textContent.trim()).toBe('Name');
    expect(headerCells[1].nativeElement.textContent.trim()).toBe('Age');
    expect(headerCells[2].nativeElement.textContent.trim()).toBe('Location');
  });
  it('should render rows correctly', () => {
    const rows = fixture.debugElement.queryAll(By.css('.table-row:not(.header)'));
    expect(rows.length).toBe(3);
    // Check first row
    const firstRowCells = rows[0].queryAll(By.css('.table-cell'));
    expect(firstRowCells.length).toBe(3);
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('John');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('30');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('New York');
  });
  
  it('should render links correctly', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(1);
    expect(links[0].nativeElement.textContent.trim()).toBe('Paris');
    expect(links[0].nativeElement.href).toContain('https://example.com');
    expect(links[0].nativeElement.target).toBe('_blank');
    expect(links[0].nativeElement.rel).toBe('noopener noreferrer');
  });
  
  it('should apply column widths correctly', () => {
    const headerCells = fixture.debugElement.queryAll(By.css('.table-row.header .table-cell'));
    expect(headerCells[0].styles['flex']).toBe('2');
    expect(headerCells[1].styles['flex']).toBe('1');
    expect(headerCells[2].styles['flex']).toBe('2');
  });
});
