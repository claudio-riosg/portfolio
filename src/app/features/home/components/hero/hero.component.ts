import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Output,
} from '@angular/core';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { ProfileImageComponent } from '@app/shared/ui/profile-image/profile-image.component';
import { ScrollRevealDirective } from '@app/core/directives/scroll-reveal.directive';

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
    window.location.href = 'mailto:connect.claudioriosgajardo@gmail.com';
  }

  onDownloadCvClick() {
    this.downloadPdf();
  }

  downloadPdf() {
    const url = 'docs/RESUME_CLAUDIO_RIOS_G.pdf';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RESUME_CLAUDIO_RIOS_G.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
