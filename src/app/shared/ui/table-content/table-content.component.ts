import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-content',
  imports: [],
  standalone: true,
  templateUrl: './table-content.component.html',
  styleUrl: './table-content.component.scss'
})
export class TableContentComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
  @Input() columnWidths: string[] = [];
}
