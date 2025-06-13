
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { fadeIn } from '../../../../shared/animations/fade-in.animation';
import { slideUp } from '../../../../shared/animations/slide-up.animation';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ProfileImageComponent } from '../../../../shared/ui/profile-image/profile-image.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ButtonComponent, ProfileImageComponent],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    fadeIn('400ms'),
    slideUp(
      { fadeIn: '300ms', slideUp: '600ms' },
      '100ms', // Delay between animations
      'cubic-bezier(0.16, 1, 0.3, 1)'
    ),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
   @Output() contactClick = new EventEmitter<void>();
   @Output() downloadCvClick = new EventEmitter<void>();

  onContactClick() {
    this.contactClick.emit();
  }

  onDownloadCvClick() {
    this.downloadCvClick.emit();
  }
}
