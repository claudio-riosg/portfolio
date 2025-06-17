import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperience } from '@app/core/models/work-experience.interface';
import { ScrollRevealDirective } from '@app/core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceCardComponent {
  experience = input.required<WorkExperience>();
} 