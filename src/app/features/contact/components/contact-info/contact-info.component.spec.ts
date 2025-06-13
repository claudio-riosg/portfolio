import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoComponent } from './contact-info.component';
import { TableInfo } from '../../../../core/models/table-info.interface';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    
    // Provide a mock for the required input
    const mockContactInfo: TableInfo = {
      headers: ['Method', 'Details'],
      rows: [
        [{text: 'Email'}, {text: 'test@test.com'}],
      ],
      columnWidths: ['1', '1'],
    };
    fixture.componentRef.setInput('contactInfo', mockContactInfo);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
