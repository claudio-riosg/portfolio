// shared/ui/components/theme-toggle/theme-toggle.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '@app/core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      (click)="toggleTheme()"
      (mouseenter)="isHovered.set(true)"
      (mouseleave)="isHovered.set(false)"
      [attr.aria-pressed]="isDark()"
      aria-label="Toggle theme"
    >
      <span class="toggle-track">
        <span
          class="toggle-thumb"
          [class.dark]="isDark()"
          [class.hover]="isHovered()"
        >
            <span class="icon-container sun-container" [class.active]="!isDark()">
              <svg class="icon sun" width="16" height="16" viewBox="0 0 24 24">
                <!-- Círculo del sol + rayos -->
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <g class="sun-rays">
                  <line
                    x1="12"
                    y1="3"
                    x2="12"
                    y2="1"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </span>
            <span class="icon-container moon-container" [class.active]="isDark()">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                class="icon moon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
              </svg>
            </span>
          </span>
        </span>
    </button>
  `,
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
  isHovered = signal(false);
  isDark = this.themeService.isDark;

  constructor() {
    // sync with service state
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDark());
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
