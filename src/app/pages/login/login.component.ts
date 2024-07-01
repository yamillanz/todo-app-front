import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { UserService } from '../../servicies/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userSevice = inject(UserService);

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

  saveNewUser() {
    console.log('Salvado!');
  }
}
