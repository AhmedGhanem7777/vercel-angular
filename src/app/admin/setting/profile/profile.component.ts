import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/admin/profile.service';
import { IProfile } from '../../../core/models/admin/profile.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  id = localStorage.getItem('id')
  isEditing: boolean = false;
  user!: IProfile
  loading: boolean = false

  constructor(private _ProfileService: ProfileService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.loading = true
    this._ProfileService.getCurrentUser(this.id).subscribe({
      next: (res) => {        
        this.loading = false
        this.user = res.data.user
      }, error: (err) => {
        this.loading = false
        console.log(err);
      }
    })
  }

  logOut() {
    this._AuthService.Logout()
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // In a real app, this would save to the backend
    this.isEditing = false;
    // Show success message
    alert('Profile updated successfully!');
  }
}
