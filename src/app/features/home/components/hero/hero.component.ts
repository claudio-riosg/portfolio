import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ProfileImageComponent } from '../../../../shared/ui/profile-image/profile-image.component';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ButtonComponent, ProfileImageComponent, ScrollRevealDirective],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
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
