import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  }
];
