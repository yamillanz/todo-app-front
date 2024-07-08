import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoListActiveComponent } from '../../components/todo-list-active/todo-list-active.component';
import { FormTodoComponent } from '../../components/form-todo/form-todo.component';
import { TodoListHistoryComponent } from '../../components/todo-list-history/todo-list-history.component';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../servicies/todo.service';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  todoToEdit: any;

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.todoList$ = this.todoService.getAllByUser(this.email ?? '');
  }

  updateList() {
    this.todoList$ = this.todoService
      .getAllByUser(this.email ?? '')
      .pipe(switchMap(() => this.todoService.getAllByUser(this.email ?? '')));
  }

  async onSelectedTodoChange(selectedTodo: any): Promise<void> {
    (!selectedTodo.status || selectedTodo.status === '') &&
      (this.todoToEdit = selectedTodo);

    if (!selectedTodo.status) return;

    try {
      if (selectedTodo.status === 'deleted') {
        await firstValueFrom(this.todoService.deleteTodo(selectedTodo.uuid));
        console.log('Todo deleted successfully');
      }

      if (selectedTodo.status === 'done') {
        selectedTodo.completed = true;
        await firstValueFrom(
          this.todoService.updateTodo(selectedTodo.uuid, selectedTodo)
        );
        console.log('Todo updated successfully');
      }
      this.updateList();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async onTodoChange(updatedTodo: any) {
    try {
      if (updatedTodo.uuid) {
        await firstValueFrom(this.todoService.updateTodo(updatedTodo.uuid, updatedTodo));
        console.log('Response: Todo updated successfully');
      } else {
        updatedTodo.userId = this.email;
        await firstValueFrom(this.todoService.saveTodo(updatedTodo));
        console.log('Response: Todo saved successfully');
      }
      this.todoToEdit = {};
      this.updateList();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
