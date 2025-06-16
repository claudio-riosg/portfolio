import { Routes } from '@angular/router';

export const EXPERIENCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/experience/experience.component').then(
        (m) => m.ExperienceComponent
      ),
  }
];
