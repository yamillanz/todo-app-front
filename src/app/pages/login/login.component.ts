import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
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
  tap,
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
  emailAlreadySaved: boolean = false;

  loginFormGoup = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.email,
    }),
  });

  searchEmail$ = this.loginFormGoup.get('email')?.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(300),
    filter(
      (email) => email.length > 3 && !!this.loginFormGoup.get('email')?.valid
    ),
    tap((value) => console.log('diaparo', value))
  );

  emailAlreadySaved$ = this.searchEmail$
    ?.pipe(
      switchMap((email) => this.userSevice.findaUserByEmail(email)),
      takeUntil(this.destroy$)
    )
    .subscribe((user) => {
      this.emailAlreadySaved = !!!user?.email;
    });

  saveNewUser() {
    console.log('Salvado!');
    this.userSevice
      .saveUser(this.loginFormGoup.get('email')?.value)
      .subscribe({
        next: (_) => {
          this.gotoTODOs();
        },
        error: (err) => {
          console.error('Error saving user:', err);
          // Optionally, you can add more error handling logic here
        },
      });
  }

  gotoTODOs() {
    const email = this.loginFormGoup.get('email')?.value;
    this.router.navigate(['/todo-list', email]);
  }

  // onBlur() {
  //   this.cdr.detectChanges();
  // }

  shouldShowRegisterButton(): boolean | undefined {
    const emailControl = this.loginFormGoup.get('email');
    return (
      (this.emailAlreadySaved || false) &&
      this.loginFormGoup.touched &&
      this.loginFormGoup.dirty &&
      emailControl?.valid &&
      emailControl?.value !== '' &&
      (emailControl?.value?.length ?? 0) > 3
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
