import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    data: { preload: true },
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'contact',
    data: { preload: true },
    loadChildren: () =>
      import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
  },
  {
    path: 'blog',
    data: { preload: true },
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.BLOG_ROUTES),
  },
  {
    path: 'about',
    data: { preload: true },
    loadChildren: () =>
      import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
  },
  // Removed duplicate 'blog' route that incorrectly loaded contact module

];
