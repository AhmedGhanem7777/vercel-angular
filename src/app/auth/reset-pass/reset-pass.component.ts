import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegexPassword } from '../../core/validations/regex';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})
export class ResetPassComponent implements OnInit {
  isLoading = false;
  resetSuccess = false;
  showPassword = false;
  showConfirmPassword = false;
  email: string = ''

  resetPasswordForm!: FormGroup;

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.email = this._AuthService.currentEmail

    // Initialize the reset password form with validation
    this.resetPasswordForm = new FormGroup(
      {
        email: new FormControl(this.email, [Validators.required, Validators.email]),
        seed: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(RegexPassword)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Handles form submission for resetting the password
  onSubmit(resetPass: FormGroup) {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      // Call the reset password API with form data
      this._AuthService.resetPassword(resetPass.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.isLoading = false
            this._ToastrService.success(res.message)
            this._Router.navigate(['/auth/login'])
          }
        }, error: (err) => {
          this.isLoading = false
          this._ToastrService.error(`${err.error.message}`)
        }
      })
    }
  }

  // Custom validator to check if the password and confirm password fields match
  passwordMatchValidator: ValidatorFn = (g: AbstractControl): { [key: string]: boolean } | null => {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  // Toggles the visibility of the password or confirm password field
  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
