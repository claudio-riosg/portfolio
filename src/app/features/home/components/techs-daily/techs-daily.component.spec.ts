import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsDailyComponent } from './techs-daily.component';

describe('TechsDailyComponent', () => {
  let component: TechsDailyComponent;
  let fixture: ComponentFixture<TechsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechsDailyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
