import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';

import { TechsDailyComponent } from './techs-daily.component';
import { of } from 'rxjs';

describe('TechsDailyComponent', () => {
  let component: TechsDailyComponent;
  let fixture: ComponentFixture<TechsDailyComponent>;

  const svgIconLoaderServiceMock = {
    loadSprite: jest.fn().mockReturnValue(of(null)),
    loadIcon: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechsDailyComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SvgIconLoaderService,
          useValue: svgIconLoaderServiceMock,
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
