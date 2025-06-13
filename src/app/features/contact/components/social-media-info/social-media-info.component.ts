import { Component, input } from '@angular/core';
import { TableInfo } from '../../../../core/models/table-info.interface';
import { TableContentComponent } from '../../../../shared/ui/table-content/table-content.component';

@Component({
  selector: 'app-social-media-info',
  imports: [TableContentComponent],
  templateUrl: './social-media-info.component.html',
  styleUrl: './social-media-info.component.scss',
  standalone: true,
})
export class SocialMediaInfoComponent {
   socialMediaInfo = input.required<TableInfo>();
}
