import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {
  isLoading: boolean = false;
  emailSent: boolean = false;

  // Form group for handling forgot password input (only requires an email field)
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private _Router: Router, private _AuthService: AuthService, private _ToastrService: ToastrService) { }

  // Handles form submission for the forgot password request
  onSubmit(forgotPassForm: FormGroup) {
    if (forgotPassForm.valid) {
      this.isLoading = true;

      // Call the forgot password API with the entered email
      this._AuthService.forgotPassword(forgotPassForm.get('email')?.value).subscribe({
        next: (res) => {
          if (res.success) {
            this._ToastrService.success(res.message)
            this.isLoading = false
            this._AuthService.currentEmail = forgotPassForm.get('email')?.value
            this._Router.navigate(['/auth/reset-pass'])
          }
        }, error: (err) => {
          this.isLoading = false
          this._ToastrService.error(`${err.error.message}`)
        }
      })
    }
  }

  // Getter method for easy access to the email form control
  get email() {
    return this.forgotPasswordForm.get('email');
  }
}
