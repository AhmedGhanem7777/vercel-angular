import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { RegexPassword } from '../../core/validations/regex';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(RegexPassword)
  ]);
  
  errorMessage = signal('');
  passwordErrorMessage = signal('');
  errMessageFromApiLogin: string = '';
  name: string = '';
  
  hide = signal(true);
  
  userData: FormGroup = new FormGroup({
    email: this.email,
    password: this.passwordControl
  });

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    // Listen for changes in email status or value and update the error message accordingly
    merge(this.email.statusChanges, this.email.valueChanges)
      .subscribe(() => this.updateErrorMessage());

    // Listen for changes in password status or value and update the error message accordingly
    merge(this.passwordControl.statusChanges, this.passwordControl.valueChanges)
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  // Handles the login functionality
  login(userData: FormGroup): void {
    if (userData.valid) {
      this._AuthService.Login(userData.value).subscribe({
        next: (res) => {
          if (res.success) {
            // Store user details in localStorage
            console.log('Login successful:', res);
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('userName', res.data.user.userName)
            localStorage.setItem('role', res.data.user.role)
            localStorage.setItem('id', res.data.user._id)
            this.name = res.data.user.userName

            // Redirect user based on role
            if (res.data.user.role == 'user') {
              this._Router.navigate(['/landing-page'])
            } else {
              this._Router.navigate(['/admin'])
            }
          }
        },
        error: (err) => {
          this.errMessageFromApiLogin = err.error.message
          this._ToastrService.error(`${this.errMessageFromApiLogin}`);
        }, complete: () => {
          this._ToastrService.success(`Welcome Back ${this.name}`);
        }
      });
    }
  }

  // Updates the error message for email validation
  updateErrorMessage(): void {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Email is required');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Please enter a valid email address');
    } else {
      this.errorMessage.set('');
    }
  }

  // Updates the error message for password validation
  updatePasswordErrorMessage(): void {
    if (this.passwordControl.hasError('required')) {
      this.passwordErrorMessage.set('Password is required');
    } else if (this.passwordControl.hasError('minlength')) {
      this.passwordErrorMessage.set('Password must be at least 8 characters');
    } else if (this.passwordControl.hasError('pattern')) {
      this.passwordErrorMessage.set('Password must contain at least one lowercase letter, one number, and one special character');
    } else {
      this.passwordErrorMessage.set('');
    }
  }


  // Handles password visibility toggle on button click
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }
}
