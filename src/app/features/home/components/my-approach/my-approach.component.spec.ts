import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';

import { MyApproachComponent } from './my-approach.component';
import { of } from 'rxjs';

describe('MyApproachComponent', () => {
  let component: MyApproachComponent;
  let fixture: ComponentFixture<MyApproachComponent>;

  const svgIconLoaderServiceMock = {
    loadSprite: jest.fn().mockReturnValue(of(null)),
    loadIcon: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyApproachComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SvgIconLoaderService,
          useValue: svgIconLoaderServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
