import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
// import { Observable } from 'rxjs';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

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
  providers: [ConfirmationService],
})
export class TodoListActiveComponent {
  @Input() todoList!: any[];
  @Output() selectedTodoChange = new EventEmitter<any>();
  confirmSvc = Inject(ConfirmationService);

  selectedtodoList!: any;

  saveTask(todo: any): void {
    this.selectedtodoList = todo;
    this.selectedTodoChange.emit(this.selectedtodoList);
  }

  actionTask(todo: any, action: string): void {
    todo.status = action;
    this.selectedTodoChange.emit(todo);
  }
}
