import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegexPassword } from '../../core/validations/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  hidePass = signal(true);
  hideConfirmPass = signal(true);
  imageUrl: string | null = null;
  selectedFile: File | null = null;

  // Define the user registration form with validation rules
  userData: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern(RegexPassword)]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('user', [Validators.required]),
    profileImage: new FormControl('')
  });

  constructor(private _AuthService: AuthService,private _Router:Router,private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    // Watch for password confirmation match
    this.userData.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.validatePasswordMatch();
    });

    // When password changes, revalidate password match if confirm password has a value
    this.userData.get('password')?.valueChanges.subscribe(() => {
      if (this.userData.get('confirmPassword')?.value) {
        this.validatePasswordMatch();
      }
    });
  }

  // Handle file selection by the user
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Create URL for image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.userData.patchValue({
          profileImage: this.selectedFile
        });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Handle user registration form submission
  Register(userData: FormGroup): void {
    if (userData.valid) {
      const formData = new FormData();

      // Append all form fields
      Object.keys(userData.value).forEach(key => {
        if (key !== 'profileImage') {
          formData.append(key, userData.value[key]);
        }
      });

      // Append the file if selected
      if (this.selectedFile) {
        formData.append('profileImage', this.selectedFile, this.selectedFile.name);
      }

      // Send registration data to the authentication service
      this._AuthService.Register(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this._ToastrService.success(res.message)
            this._Router.navigate(['/auth/login'])
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.markFormGroupTouched(userData);
    }
  }

  // Mark all form controls as touched to trigger validation errors
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Validate if password and confirm password match
  validatePasswordMatch(): void {
    const password = this.userData.get('password')?.value;
    const confirmPassword = this.userData.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.userData.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      const currentErrors = this.userData.get('confirmPassword')?.errors;
      if (currentErrors) {
        delete currentErrors['passwordMismatch'];
        this.userData.get('confirmPassword')?.setErrors(
          Object.keys(currentErrors).length === 0 ? null : currentErrors
        );
      }
    }
  }

  // Toggle password visibility
  clickEventPass(event: MouseEvent): void {
    this.hidePass.set(!this.hidePass());
    event.stopPropagation();
  }

  // Toggle confirm password visibility
  clickEventConfirmPass(event: MouseEvent): void {
    this.hideConfirmPass.set(!this.hideConfirmPass());
    event.stopPropagation();
  }

}

