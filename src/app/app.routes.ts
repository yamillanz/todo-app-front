import { Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: 'login',
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
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
