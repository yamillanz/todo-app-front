import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-todo-list-history',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputTextModule,
    DatePipe,
    ButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './todo-list-history.component.html',
  styleUrl: './todo-list-history.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TodoListHistoryComponent {
  @Input() historyTodoList: any[] = [];
  @Output() undoTodo = new EventEmitter<any>();
  // confirmSvc = Inject(ConfirmationService);

  constructor(private confirmSvc: ConfirmationService) {}

  actionTask(todo: any, action: string): void {
    this.confirmSvc.confirm({
      message: `¿Seguro de Deshacer?`,
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        todo.status = action;
        this.undoTodo.emit(todo);
        return;
      },
      reject: () => {},
      key: 'positionDialog',
    });
  }
}
