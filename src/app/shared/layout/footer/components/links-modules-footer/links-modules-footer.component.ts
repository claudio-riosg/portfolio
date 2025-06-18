import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavLink } from '@app/core/models/nav-link.interface';

@Component({
  selector: 'app-links-modules-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<nav class="footer__nav" aria-label="Footer navigation">
   @for (link of links; track link.path) {
    <a routerLink="{{ link.path }}">{{ link.name }}</a>
  }
</nav>`,
  styleUrl: './links-modules-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksModulesFooterComponent {
  @Input({ required: true }) links!: NavLink[];
} 