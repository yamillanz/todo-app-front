import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';

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
  ],
  templateUrl: './todo-list-active.component.html',
  styleUrl: './todo-list-active.component.scss',
})
export class TodoListActiveComponent {
  todoList: any[] = [
    { title: 'Valor1', description: 'descripcion 2', createdAt: '2001' },
    { title: 'Valor3', description: 'descripcion 3', createdAt: '2001' },
    { title: 'Valor4', description: 'descripcion 3', createdAt: '2001' },
  ];
  todoList$: Observable<any[]> | unknown = [];

  selectedtodoList!: any;
}
