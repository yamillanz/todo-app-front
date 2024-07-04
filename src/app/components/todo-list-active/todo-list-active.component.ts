import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
// import { Observable } from 'rxjs';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-todo-list-active',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    CommonModule,
    TodoDetailsComponent,
    ButtonModule,
  ],
  templateUrl: './todo-list-active.component.html',
  styleUrl: './todo-list-active.component.scss',
})
export class TodoListActiveComponent {
  @Input() todoList!: any[];
  // todoList$: Observable<any[]> | unknown = [];

  selectedtodoList!: any;

  editTask(todo: any): void {
    this.selectedtodoList = todo;
  }

  deleteTask(todo: any): void {
    this.todoList = this.todoList.filter((t) => t.id !== todo.id);
  }
}
