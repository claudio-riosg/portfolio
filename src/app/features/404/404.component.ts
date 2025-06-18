import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '@app/core/services/theme.service';
import { AnimatedAvatarComponent } from '@app/shared/ui/animated-avatar/animated-avatar.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, AnimatedAvatarComponent ],
  template: `
    <div class="not-found-wrapper">
      <app-animated-avatar class="animated-avatar-desktop" [isDark]="isDark()" />
      <section class="not-found-container">
        <h1 class="not-found-title title-gradient">404</h1>
        <p class="not-found-message">Page Not Found</p>
        <a routerLink="/home" class="not-found-link">Go to Home</a>
      </section>
      <app-animated-avatar class="animated-avatar-mobile" [isDark]="isDark()"/>
      <app-animated-avatar class="animated-avatar-desktop" [isDark]="isDark()"/>
    </div>
  `,
  styleUrl: './404.component.scss'
})
export class NotFoundComponent {
    private themeService = inject(ThemeService);
    isDark = this.themeService.isDark;
} 