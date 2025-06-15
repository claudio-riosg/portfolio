import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';
import { ContactInfoComponent } from './contact-info.component';
import { of } from 'rxjs';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  const svgIconLoaderServiceMock = {
    loadSprite: jest.fn().mockReturnValue(of(null)),
    loadIcon: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SvgIconLoaderService, useValue: svgIconLoaderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('contactInfo', {
      headers: ['Test', 'Value'],
      rows: [[{ text: 'A' }, { text: 'B' }]],
      columnWidths: ['1', '1'],
    });
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
