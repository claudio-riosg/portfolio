import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApproachComponent } from './my-approach.component';

describe('MyApproachComponent', () => {
  let component: MyApproachComponent;
  let fixture: ComponentFixture<MyApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyApproachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyApproachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
