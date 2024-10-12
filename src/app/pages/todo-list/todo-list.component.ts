import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoListActiveComponent } from '../../components/todo-list-active/todo-list-active.component';
import { FormTodoComponent } from '../../components/form-todo/form-todo.component';
import { TodoListHistoryComponent } from '../../components/todo-list-history/todo-list-history.component';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../servicies/todo.service';
import {
  firstValueFrom,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TodoDTO } from '../../shared/TodoDTO';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class TodoListComponent implements OnDestroy {
  email: string | null = null;
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);

  todoList$: Observable<any[]> = new Observable<any[]>();
  todoListHistory: any[] = [];
  todoToEdit: any;

  // subjectDestroy = new Subject();
  _destryRef = inject(DestroyRef);

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.todoList$ = this.todoService.getAllByUser(this.email ?? '');

    this.todoService
      .getAllByUserHistory(this.email ?? '')
      // .pipe(take(1), takeUntil(this.subjectDestroy))
      .pipe(takeUntilDestroyed(this._destryRef))
      .subscribe({
        next: (data) => (this.todoListHistory = [...data]),
        error: (error) => console.error('An error occurred:', error),
      });
  }

  updateList() {
    this.todoList$ = this.todoService
      .getAllByUser(this.email ?? '')
      .pipe(switchMap(() => this.todoService.getAllByUser(this.email ?? '')));

    this.todoService
      .getAllByUserHistory(this.email ?? '')
      // .pipe(take(1), takeUntil(this.subjectDestroy))
      .pipe(takeUntilDestroyed(this._destryRef))
      .subscribe({
        next: (data) => (this.todoListHistory = [...data]),
        error: (error) => console.error('An error occurred:', error),
      });
  }

  ngOnDestroy(): void {
    // this.subjectDestroy.next('');
    // this.subjectDestroy.complete();
  }

  async onSelectedTodoChange(selectedTodo: TodoDTO): Promise<void> {
    (!selectedTodo.status || selectedTodo.status === '') &&
      (this.todoToEdit = selectedTodo);

    if (!selectedTodo.status) return;
    if (!selectedTodo.uuid) return;
    
    try {
      if (selectedTodo.status === 'deleted') {
        await firstValueFrom(this.todoService.deleteTodo(selectedTodo.uuid));
        console.log('Todo deleted successfully');
      }

      if (selectedTodo.status === 'done') {
        selectedTodo.completed = true;
        selectedTodo.completedAt = new Date().toISOString();
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

  async onTodoChange(updatedTodo: TodoDTO) {
    try {
      if (updatedTodo.uuid) {
        await firstValueFrom(
          this.todoService.updateTodo(updatedTodo.uuid, updatedTodo)
        );
        console.log('Response: Todo updated successfully');
      } else {
        updatedTodo.userId = this.email ?? '';
        await firstValueFrom(this.todoService.saveTodo(updatedTodo));
        console.log('Response: Todo saved successfully');
      }
      this.todoToEdit = {};
      this.updateList();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async onUndoTask(todo: TodoDTO) {
    try {
      delete todo.status;
      todo.completed = false;
      todo.completedAt = null;
      todo.uuid &&
        (await firstValueFrom(this.todoService.updateTodo(todo.uuid, todo)));

      this.updateList();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
