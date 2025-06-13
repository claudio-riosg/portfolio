import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/blog/blog.component').then(
        (m) => m.BlogComponent
      ),
  }
];
