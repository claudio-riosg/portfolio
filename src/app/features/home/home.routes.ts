import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/home/home.component').then(
        (m) => m.HomeComponent
      ),
  }
];
