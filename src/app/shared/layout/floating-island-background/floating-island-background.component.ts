import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-floating-island-background',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './floating-island-background.component.html',
  styleUrl: './floating-island-background.component.scss'
})
export class FloatingIslandBackgroundComponent {
  isDarkTheme = input.required<boolean>();
  imageUrl = input.required<string>();
}
