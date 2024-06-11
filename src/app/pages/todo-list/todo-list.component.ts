import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoListActiveComponent } from '../../components/todo-list-active/todo-list-active.component';
import { TodoListHistoryComponent } from '../../components/todo-list-history/todo-list-history.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [HeaderComponent, TodoListActiveComponent, TodoListHistoryComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {}
