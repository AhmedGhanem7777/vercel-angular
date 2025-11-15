import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { RegexPassword } from '../../core/validations/regex';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isLoading = false;
  changeSuccess = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    // Initialize the change password form with validation
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(RegexPassword)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if the new password and confirm password fields match
  passwordMatchValidator: ValidatorFn = (g: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  };

  // Handles form submission for changing the password
  onSubmit(changePass: FormGroup) {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;

      // Call the change password API with form data
      this._AuthService.changePassword(changePass.value).subscribe({
        next: (res) => {
          this.isLoading = false
          this._ToastrService.success(`${res.message}`)
          this._Router.navigate(['/landing-page'])
        }, error: (err) => {
          this.isLoading = false
          this._ToastrService.error(err.error.message)
        }
      })
    }
  }

  // Toggles the visibility of password fields
  togglePasswordVisibility(field: 'oldPassword' | 'newPassword' | 'confirmPassword') {
    switch (field) {
      case 'oldPassword':
        this.showOldPassword = !this.showOldPassword;
        break;
      case 'newPassword':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }
}
