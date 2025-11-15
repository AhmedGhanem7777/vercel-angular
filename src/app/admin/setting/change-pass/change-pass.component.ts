import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../../core/services/admin/setting.service';
import { RegexPassword } from '../../../core/validations/regex';

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

  constructor(private _SettingService: SettingService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    // Initialize the change password form with form controls and validators
    this.changePasswordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(RegexPassword)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator function to verify that the new password and confirm password fields have matching values
  passwordMatchValidator: ValidatorFn = (g: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  };

  // Submit handler for the change password form
  onSubmit(changePass: FormGroup) {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;

      this._SettingService.changePassword(changePass.value).subscribe({

        next: (res) => {
          if (res.success) {
            this.isLoading = false
            this._ToastrService.success(`${res.message}`)
            this._Router.navigate(['/admin'])
          }
        }, error: (err) => {
          this.isLoading = false
          this._ToastrService.error(err.error.message)
        }
      })
    }
  }

  // Toggle the visibility of password fields (oldPassword, newPassword, confirmPassword)
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
