import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';
import { UserService } from '../../servicies/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  userSevice = inject(UserService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);

  loginFormGoup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.email,
    }),
  });

  searchEmail$ = this.loginFormGoup.get('email')?.valueChanges.pipe(
    debounceTime(300),
    filter(
      (email) => email.length > 3 && !!this.loginFormGoup.get('email')?.valid
    ),
    distinctUntilChanged()
  );

  emailAlreadySaved: boolean = false;

  emailAlreadySaved$ = this.searchEmail$
    ?.pipe(
      switchMap((email) => this.userSevice.findaUserByEmail(email)),
      takeUntil(this.destroy$)
    )
    .subscribe((user) => {
      this.emailAlreadySaved = !!!user?.email;
      // console.log(user);
      // console.log(this.emailAlreadySaved);
    });

  saveNewUser() {
    console.log('Salvado!');
  }

  gotoTODOs() {
    const email = this.loginFormGoup.get('email')?.value;
    this.router.navigate(['/todo-list', email]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
