import { Routes } from '@angular/router';
import { NotFoundComponent } from './404.component';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./404.component').then(m => m.NotFoundComponent)
  }
]; 