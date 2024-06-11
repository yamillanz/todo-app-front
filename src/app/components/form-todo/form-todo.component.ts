import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-form-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.scss',
})
export class FormTodoComponent implements OnInit {
  todoForm!: FormGroup;

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  saveProduct() {}
}
