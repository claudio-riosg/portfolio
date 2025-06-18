import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../ui/svg-icon/svg-icon.component';
import { SocialLinkIcon } from '@app/core/models/icon-config.interface';



@Component({
  selector: 'app-social-links-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `<div class="footer__social">
    @for (link of socialLinks(); track link.path) {
      <a [href]="link.path" target="_blank" rel="noopener">
        <app-icon
          [config]="{ name: link.iconName, spritePath: link.path, size: link.size }"
          [external]="true"
        />
      </a>
    }
  </div>`,
  styleUrl: './social-links-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksFooterComponent {
  socialLinks = input<SocialLinkIcon[]>([]);
}