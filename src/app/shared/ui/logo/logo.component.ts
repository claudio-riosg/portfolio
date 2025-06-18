import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@app/core/services/theme.service';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  readonly themeService = inject(ThemeService);
}