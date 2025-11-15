import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/admin/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userName: string | null = ''
  userId = localStorage.getItem('id')
  userImage:any

  constructor(private _Router:Router,private _AuthService:AuthService,private _ProfileService:ProfileService) { }

  ngOnInit(): void {
    this.getUserName()
    this.getUserInfo()
  }

  // Function to retrieve the user's name from local storage
  getUserName() {
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName')
    }
  }

  // Function to log the user out
  logout() {
    this._AuthService.Logout()
  }

  // Function to fetch the current user's profile information
  getUserInfo(){
    this._ProfileService.getCurrentUser(this.userId).subscribe({
      next:(res)=>{
        console.log('res',res.data.user.profileImage);
        this.userImage = res.data.user.profileImage
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
