import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme.service'
import { IconComponent } from '../../../../shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-techs-daily',
  standalone: true,
  imports: [CommonModule, IconComponent ],
  templateUrl: './techs-daily.component.html',
  styleUrls: ['./techs-daily.component.scss'],
})
export class TechsDailyComponent {
  private themeService = inject(ThemeService);
  isDark = this.themeService.isDark;

  // Señal reactiva para las tecnologías
  technologies = signal([
    { name: 'Angular', icon: 'angular.svg', category: 'frontend',color: '#8514f5' },
    { name: 'TypeScript', icon: 'typescript.svg', category: 'Language',color:'#3178C6'},
    { name: 'Node.js', icon: 'nodejs.svg', category: 'backend', color:'#5FA04E'},
    { name: 'RxJS', icon: 'reactivex.svg', category: 'frontend', color:'#B7178C' },
    { name: 'Tailwind', icon: 'tailwindcss.svg', category: 'Styling',color: '#06B6D4' },
    { name: 'Docker', icon: 'docker.svg', category: 'devops', color: '#2496ED'}
  ]);

  // Mensajes dinámicos
  dailyMessages = [
    "Today I feel productive with this stack!",
    "My arsenal for building modern apps"
  ];

  // Mensaje del día basado en fecha
  dailyMessage = computed(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return this.dailyMessages[dayOfYear % this.dailyMessages.length];
  });

  // Filtrado reactivo
  categories = signal(['all', 'Frontend', 'Backend', 'DevOps', 'Language', 'Styling']);
  currentCategory = signal('all');

  filteredTechs = computed(() => {
    if (this.currentCategory() === 'all') return this.technologies();
    return this.technologies().filter(tech => 
      tech.category.toLowerCase() === this.currentCategory().toLowerCase()
    );
  });

  setCategory(category: string) {
    this.currentCategory.set(category);
  }
}