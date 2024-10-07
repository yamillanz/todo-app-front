import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-form-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, InputTextareaModule],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.scss',
})
export class FormTodoComponent implements OnInit, OnChanges {
  todoForm!: FormGroup;
  @Input() todoToEdit: any;
  @Output() todoToEditChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.todoForm = new FormGroup({
      title: new FormControl(this.todoToEdit?.title ?? '', Validators.required),
      description: new FormControl(
        this.todoToEdit?.description ?? '',
        Validators.required
      ),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['firstChange']) {
      this.initForm();
    }
  }

  saveProduct() {
    if (this.todoForm.valid) {
      const editedTodo = {
        ...this.todoToEdit,
        ...this.todoForm.value,
      };
      this.todoForm.reset();
      this.todoToEditChange.emit(editedTodo);
    }
  }
}
