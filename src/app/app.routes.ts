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
    path: 'experience',
    data: { preload: true },
    loadChildren: () =>
      import('./features/experience/experience.routes').then((m) => m.EXPERIENCE_ROUTES)
  }
];
