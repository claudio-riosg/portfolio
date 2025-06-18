import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LogoComponent } from '@app/shared/ui/logo/logo.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinksModulesFooterComponent, SocialLinksFooterComponent } from '@app/shared/layout/footer/components';
import { SocialLinkIcon } from '@app/core/models/icon-config.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent, LinksModulesFooterComponent, SocialLinksFooterComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly linksModules = [
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  socialLinksSignal = signal<SocialLinkIcon[]>([
    {
      name: 'GitHub',
      path: 'https://github.com/claudio-riosg',
      iconName: 'github',
      size: '24px',
      spritePath: ''
    },
    {
      name: 'LinkedIn',
      path: 'https://linkedin.com/in/claudio-rios-gajardo',
      iconName: 'linkedin',
      size: '24px',
      spritePath: ''
    },
  ]);
}
