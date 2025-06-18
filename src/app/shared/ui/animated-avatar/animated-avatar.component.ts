import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-animated-avatar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './animated-avatar.component.html',
  styleUrl: './animated-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedAvatarComponent {
  @Input() sensitivity = 15; //control cursor sensitivity
  @Input() clickEffect = true; // efect for click interaction
  @Input() isDark = false;
  position = { x: 0, y: 0 };
  scale = 1;
  rotation = 0;
  el = inject(ElementRef);
  

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.position = {
      x: (event.clientX - centerX) / this.sensitivity,
      y: (event.clientY - centerY) / this.sensitivity,
    };

    this.rotation = this.position.x * 0.5;
  }

  @HostListener('click')
  onClick() {
    if (!this.clickEffect) return;

    this.scale = 0.9;
    setTimeout(() => (this.scale = 1), 300);
  }

  get transformStyle() {
    return {
      transform: `
        translate(${this.position.x}px, ${this.position.y}px)
        rotate(${this.rotation}deg)
        scale(${this.scale})
      `,
      transition:
        this.scale !== 1
          ? 'transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)'
          : 'transform 0.5s ease-out',
    };
  }
}
