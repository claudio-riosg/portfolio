import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';
import { SocialMediaInfoComponent } from './social-media-info.component';
import { of } from 'rxjs';

describe('SocialMediaInfoComponent', () => {
  let component: SocialMediaInfoComponent;
  let fixture: ComponentFixture<SocialMediaInfoComponent>;

  const svgIconLoaderServiceMock = {
    loadSprite: jest.fn().mockReturnValue(of(null)),
    loadIcon: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaInfoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SvgIconLoaderService, useValue: svgIconLoaderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialMediaInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('socialMediaInfo', {
      headers: ['Platform', 'Username'],
      rows: [[{ text: 'Twitter' }, { text: '@testuser' }]],
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
