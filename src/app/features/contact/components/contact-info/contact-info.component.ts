import { Component, input } from '@angular/core';
import { TableInfo } from '../../../../core/models/table-info.interface';
import { TableContentComponent } from '../../../../shared/ui/table-content/table-content.component';

@Component({
  selector: 'app-contact-info',
  imports: [TableContentComponent],
  standalone: true,
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
   contactInfo = input.required<TableInfo>();
}
