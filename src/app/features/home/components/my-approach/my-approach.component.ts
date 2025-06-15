import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-my-approach',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './my-approach.component.html',
  styleUrl: './my-approach.component.scss',
})
export class MyApproachComponent {}
