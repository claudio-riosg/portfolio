import { Routes } from '@angular/router';


export const ABOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/about/about.component').then(
        (m) => m.AboutComponent
      ),
  }
];
