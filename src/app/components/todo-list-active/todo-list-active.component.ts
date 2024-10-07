import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
// import { Observable } from 'rxjs';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const enum ACTIONS {
  delete = 'deleted',
  done = 'done',
}

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
    ConfirmDialogModule,
  ],
  templateUrl: './todo-list-active.component.html',
  styleUrl: './todo-list-active.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TodoListActiveComponent {
  @Input() todoList!: any[];
  @Output() selectedTodoChange = new EventEmitter<any>();
  // confirmSvc = Inject(ConfirmationService);
  // messageSvc = Inject(MessageService);
  selectedtodoList!: any;

  constructor(private confirmSvc: ConfirmationService) {}

  saveTask(todo: any): void {
    this.selectedtodoList = todo;
    this.selectedTodoChange.emit(this.selectedtodoList);
  }

  actionTask(todo: any, action: string): void {
    const mensaje = action === ACTIONS.delete ? 'BORRAR' : 'pasar a DONE';
    // if (action === 'deleted') {
    this.confirmSvc.confirm({
      message: `¿Seguro de ${mensaje}?`,
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        todo.status = action;
        this.selectedTodoChange.emit(todo);
        return;
      },
      reject: () => {},
      key: 'positionDialog',
    });
    // }
    // this.selectedTodoChange.emit(todo);
  }
}
