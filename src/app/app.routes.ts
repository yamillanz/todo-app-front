import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./pages/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
];
