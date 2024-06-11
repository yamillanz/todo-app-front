import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list-active',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    CommonModule,
  ],
  templateUrl: './todo-list-active.component.html',
  styleUrl: './todo-list-active.component.scss',
})
export class TodoListActiveComponent {
  todoList!: any[];
  todoList$: Observable<any[]> | unknown = [];

  selectedtodoList!: any;
}
