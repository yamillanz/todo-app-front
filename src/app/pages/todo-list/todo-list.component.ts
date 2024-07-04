import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoListActiveComponent } from '../../components/todo-list-active/todo-list-active.component';
import { FormTodoComponent } from '../../components/form-todo/form-todo.component';
import { TodoListHistoryComponent } from '../../components/todo-list-history/todo-list-history.component';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../servicies/todo.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    HeaderComponent,
    TodoListActiveComponent,
    TodoListHistoryComponent,
    FormTodoComponent,
    AsyncPipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  email: string | null = null;
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);

  todoList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.todoList$ = this.todoService.getAllByUser(this.email ?? '');
  }
}
