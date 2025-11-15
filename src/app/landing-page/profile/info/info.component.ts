import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/admin/profile.service';
import { IProfile } from '../../../core/models/admin/profile.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  currentUserId = localStorage.getItem('id')
  userInfo!: IProfile

  constructor(private _ProfileService: ProfileService) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  // Get the current user details
  getUserInfo() {
    this._ProfileService.getCurrentUser(this.currentUserId).subscribe({
      next: (res) => {
        if (res.success) {
          // If the response is successful, store user data
          this.userInfo = res.data.user
        }
      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
