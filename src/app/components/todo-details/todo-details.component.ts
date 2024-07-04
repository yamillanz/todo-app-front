import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent {
  @Input('todoItem') todoItem: any;
  @Input('withActions') withActions: boolean = true;
  @Input('') columsShow?: string[] = [];

  editTask(todo: any): void {
    console.log('editTask', todo);
  }

  deleteTask(todo: any): void {
    // this.todoList = this.todoList.filter((t) => t.id !== todo.id);
    console.log('deleteTask', todo);
  }
}
