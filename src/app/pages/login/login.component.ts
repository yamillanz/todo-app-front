import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormGoup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.email,
    }),
  });

  searchEmail$ = this.loginFormGoup.get('email')?.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap((value) => console.log(value))
  );

  // $searchEmail = this.loginFormGoup.valueChanges.pipe(
  //   // debounceTime(300),
  //   // distinctUntilKeyChanged('email'),
  //   tap((value) => console.log(value))
  // );
}
