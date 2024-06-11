import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-todo-list-history',
  standalone: true,
  imports: [TableModule, IconFieldModule, InputTextModule],
  templateUrl: './todo-list-history.component.html',
  styleUrl: './todo-list-history.component.scss',
})
export class TodoListHistoryComponent {
  historyTodoList: any[] = [];
}
