import { Injectable, signal, effect, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private window = this.document.defaultView!;

   isDark = signal(this.getInitialTheme() === 'dark');

  // 2. Computed para el tema actual
  currentTheme = computed(() => this.isDark() ? 'dark' : 'light');

  constructor() {
    // 3. Efecto simplificado
    effect(() => {
      const theme = this.isDark() ? 'dark' : 'light';
      this.applyThemeToDom(theme);
      this.persistTheme(theme);
    });

    this.setupSystemPreferenceListener();
  }

  toggleTheme() {
    this.isDark.update(current => !current);
  }

  private getInitialTheme(): 'light' | 'dark' {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return this.window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }

  private applyThemeToDom(theme: 'light' | 'dark') {
    this.document.body.classList.toggle('dark', theme === 'dark');
    this.document.documentElement.setAttribute('data-theme', theme);
  }

  private persistTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme);
  }

  private setupSystemPreferenceListener() {
    this.window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          this.isDark.set(e.matches);
        }
      });
  }
}