import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../core/services/svg-icon-loader.service';
import { TableContentComponent } from './table-content.component';
import { of } from 'rxjs';

describe('TableContentComponent', () => {
  let component: TableContentComponent;
  let fixture: ComponentFixture<TableContentComponent>;

  const svgIconLoaderServiceMock = {
    loadSprite: jest.fn().mockReturnValue(of(null)),
    loadIcon: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableContentComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SvgIconLoaderService, useValue: svgIconLoaderServiceMock },
      ],
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

  it('should render the table structure', () => {
    const table = fixture.nativeElement.querySelector('.table-container');
    expect(table).toBeTruthy();
  });
});
