import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SvgIconLoaderService } from '../../../core/services/svg-icon-loader.service';
import { iconLoaderMock } from '@testing/helpers/svg-icon.mocks';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: SvgIconLoaderService, useValue: iconLoaderMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
