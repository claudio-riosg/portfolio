import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialMediaInfoComponent } from './social-media-info.component';
import { TableInfo } from '../../../../core/models/table-info.interface';

describe('SocialMediaInfoComponent', () => {
  let component: SocialMediaInfoComponent;
  let fixture: ComponentFixture<SocialMediaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaInfoComponent);
    component = fixture.componentInstance;
    
    // Provide a mock for the required input
    const mockSocialMediaInfo: TableInfo = {
      headers: ['Platform', 'Username'],
      rows: [
        [{text: 'Twitter'}, {text: '@testuser'}],
      ],
      columnWidths: ['1', '1'],
    };
    fixture.componentRef.setInput('socialMediaInfo', mockSocialMediaInfo);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
