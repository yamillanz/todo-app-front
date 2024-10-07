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
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  userSevice = inject(UserService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
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
      this.cdr.detectChanges();
    });

  saveNewUser() {
    console.log('Salvado!');
    this.userSevice
      .saveUser(this.loginFormGoup.get('email')?.value)
      .pipe(takeUntil(this.destroy$))
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

  onBlur() {
    this.cdr.detectChanges();
  }

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
