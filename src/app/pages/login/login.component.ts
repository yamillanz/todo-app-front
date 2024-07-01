import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  filter,
  switchMap,
  tap,
} from 'rxjs';
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
    filter(
      (email) => email.length > 3 && !!this.loginFormGoup.get('email')?.valid
    )
    // tap((value) => console.log(value))
  );

  emailAlreadySaved$ = this.searchEmail$?.pipe(
    // filter(
    //   () =>
    //     this.loginFormGoup.touched &&
    //     this.loginFormGoup.dirty &&
    //     // this.loginFormGoup.valid &&
    //     !!this.loginFormGoup.get('email')?.valid
    // ),
    switchMap((email) => this.userSevice.findaUserByEmail(email))
    // tap((user) => console.log('user', user))
  );

  saveNewUser() {
    console.log('Salvado!');
  }
}
