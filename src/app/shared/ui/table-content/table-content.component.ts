import { Component, Input } from '@angular/core';
import { IconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-table-content',
  imports: [IconComponent],
  standalone: true,
  templateUrl: './table-content.component.html',
  styleUrl: './table-content.component.scss'
})
export class TableContentComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
  @Input() columnWidths: string[] = [];
}
