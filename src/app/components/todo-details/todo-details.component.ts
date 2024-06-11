import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent {
  @Input('todoItem') todoItem: any;
  @Input('withActions') withActions: boolean = true;
  @Input('') columsShow?: string[] = [];
}
