import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/admin/profile.service';
import { IProfile } from '../../core/models/admin/profile.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  id = localStorage.getItem('id')
  user!: IProfile
  userName:string=''
  profileImage:string=''
  email:string=''

  constructor(private _ProfileService: ProfileService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this._ProfileService.getCurrentUser(this.id).subscribe({
      next: (res) => {
        console.log('user data',res);
        this.user = res.data.user
        this.userName = res.data.user.userName
        this.email = res.data.user.email
        this.profileImage = res.data.user.profileImage
      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
