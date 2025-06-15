import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';
import { TechsDailyComponent } from './techs-daily.component';
import { iconLoaderMock } from '@testing/helpers/svg-icon.mocks';

describe('TechsDailyComponent', () => {
  let component: TechsDailyComponent;
  let fixture: ComponentFixture<TechsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechsDailyComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SvgIconLoaderService,
          useValue: iconLoaderMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
