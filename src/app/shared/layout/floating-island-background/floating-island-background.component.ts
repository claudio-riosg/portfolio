import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-floating-island-background',
  imports: [],
  templateUrl: './floating-island-background.component.html',
  styleUrl: './floating-island-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingIslandBackgroundComponent {
  isDarkTheme = input.required<boolean>();
  imageUrl = input.required<string>();
}
