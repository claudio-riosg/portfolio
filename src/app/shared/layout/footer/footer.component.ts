import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LogoComponent } from '../../ui/logo/logo.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinksModulesFooterComponent } from './components/links-modules-footer/links-modules-footer.component';
import { SocialLinksFooterComponent } from './components/social-links-footer/social-links-footer.component';
import { SocialLinkIcon } from '@app/core/models/icon-config.interface';
import { ScrollRevealDirective } from '@app/core/directives/scroll-reveal.directive';

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
      path: 'https://github.com/tuusuario',
      iconName: 'github',
      size: '24px',
      spritePath: ''
    },
    {
      name: 'LinkedIn',
      path: 'https://linkedin.com/in/tuusuario',
      iconName: 'linkedin',
      size: '24px',
      spritePath: ''
    },
  ]);
}
