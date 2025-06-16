import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/ui/svg-icon/svg-icon.component';
import { ApproachCard } from '@app/core/models/approach-card.interface';



@Component({
  selector: 'app-my-approach',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './my-approach.component.html',
  styleUrl: './my-approach.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyApproachComponent {
  approachCards: ApproachCard[] = [
    {
      iconConfig: { name: 'icon-clean-code', spritePath: '/icons/approach-sprite.svg' },
      title: 'Clean & Robust Code',
      description: 'I prioritize writing clean, maintainable, and well-tested code, ensuring robustness and security at every layer.',
      colorClass: 'primary',
    },
    {
      iconConfig: { name: 'icon-scalable', spritePath: '/icons/approach-sprite.svg' },
      title: 'Scalable Architecture',
      description: 'I design solutions that grow with business needs, building flexible and efficient systems capable of handling demand.',
      colorClass: 'secondary',
    },
    {
      iconConfig: { name: 'icon-performance', spritePath: '/icons/approach-sprite.svg' },
      title: 'Performance Focused',
      description: 'Continuous optimization to deliver smooth and fast user experiences, prioritizing efficiency and interactivity.',
      colorClass: 'accent',
    },
    {
      iconConfig: { name: 'icon-learning', spritePath: '/icons/approach-sprite.svg' },
      title: 'Continuous Learning',
      description: 'I stay up-to-date with the latest trends and technologies, adopting new tools for innovative solutions.',
      colorClass: 'tertiary',
    },
  ];
}
