import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../../core/services/svg-icon-loader.service';
import { MyApproachComponent } from './my-approach.component';
import { iconLoaderMock } from '@testing/helpers/svg-icon.mocks';

describe('MyApproachComponent', () => {
  let component: MyApproachComponent;
  let fixture: ComponentFixture<MyApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyApproachComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SvgIconLoaderService,
          useValue: iconLoaderMock,
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
