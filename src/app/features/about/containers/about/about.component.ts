import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FloatingIslandBackgroundComponent } from '../../../../shared/layout/floating-island-background/floating-island-background.component';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-about',
  imports: [FloatingIslandBackgroundComponent],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  imageUrl = signal('images/forest');
  isDarkTheme = inject(ThemeService);
}
