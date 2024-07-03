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
  {
    path: 'todo-list/:email',
    loadComponent() {
      return import('./pages/todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      );
    },
  },
];
