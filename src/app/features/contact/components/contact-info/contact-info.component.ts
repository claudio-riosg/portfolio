import { Component, input } from '@angular/core';
import { TableInfo } from '../../../../core/models/table-info.interface';
import { TableContentComponent } from '../../../../shared/ui/table-content/table-content.component';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact-info',
  imports: [TableContentComponent, ScrollRevealDirective],
  standalone: true,
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
   contactInfo = input.required<TableInfo>();
}
