import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavLink } from '../../../../core/models/nav-link.interface';

@Component({
  selector: 'app-nav-links',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./nav-links.component.scss'],
  template: `
    <nav
      class="nav-links"
      [class.mobile-open]="mobileMenuOpen"
      role="navigation"
      aria-label="Main navigation"
    >
      <a
        *ngFor="let link of links"
        routerLink="{{ link.path }}"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        (click)="linkClick.emit()"
      >{{ link.name }}</a>
    </nav>
  `,
})

export class NavLinksComponent {
  @Input() mobileMenuOpen = false;
  @Input({ required: true }) isMobileView!: Signal<boolean>;
  @Output() linkClick = new EventEmitter<void>();
  links: NavLink[] = [
    { path: '/experience', name: 'Experience' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' },
  ];
}